import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, Observable } from 'rxjs';
import { filter, map, observeOn } from 'rxjs/operators';
import { ApplicationState } from '../../state/app.state';
import { Project } from '../models/projects.model';

import {
  ProjectDialogComponent,
  ProjectDialogData,
  ProjectDialogMode,
  ProjectDialogResult,
  ProjectDialogResultType
} from '../project-dialog/project-dialog.component';

import { AddProject, DeleteProject, EditProject, GetProjects } from '../state/projects.actions';
import { ProjectsSelectors } from '../state/projects.selectors';

@Component({
  selector: 'ac-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {
  projects$: Observable<Array<Project>>;

  constructor(private store: Store<ApplicationState>, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.projects$ = this.store.pipe(select(ProjectsSelectors.getProjects));
    this.store.dispatch(new GetProjects());
  }

  navigateToProject(projectId: string) {
    this.router.navigate([`/${projectId}/checklist`]);
  }

  addProject() {
    this.openProjectDialog({ title: 'Add Project', submitButtonText: 'Create' })
      .pipe(
        map(({ payload: newProject }) => {
          this.store.dispatch(new AddProject(newProject));
          return newProject;
        }),
        observeOn(asyncScheduler)
      )
      .subscribe(({ id }) => this.navigateToProject(id));
  }

  editProject(event: MouseEvent, project: Project) {
    event.stopPropagation();

    this.openProjectDialog({
      title: 'Edit Project',
      submitButtonText: 'Save',
      mode: ProjectDialogMode.Edit,
      project
    }).subscribe(result => {
      const updatedProject = result.payload;

      if (result.type === ProjectDialogResultType.Delete) {
        this.store.dispatch(new DeleteProject(updatedProject.id));
      } else {
        this.store.dispatch(new EditProject({ current: project, updated: updatedProject }));
      }
    });
  }

  private openProjectDialog(data: Partial<ProjectDialogData>) {
    return this.dialog
      .open(ProjectDialogComponent, {
        minWidth: 350,
        data
      })
      .afterClosed()
      .pipe<ProjectDialogResult>(filter((x) => {
        return x;
      }));
  }
}
