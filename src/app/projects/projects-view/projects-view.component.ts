import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { asyncScheduler } from 'rxjs';
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

import { AddProject, DeleteProject, EditProject } from '../state/projects.actions';
import { ProjectsSelectors } from '../state/projects.selectors';
import { MatIconButton } from '@angular/material/button';
import { PercentPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { ToolbarLogoComponent } from 'src/app/shared/toolbar/toolbar-logo/toolbar-logo.component';
import { ScoreChartComponent } from 'src/app/shared/score-chart/score-chart.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
  standalone: true,
  selector: 'ac-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss'],
  imports: [
    MatCard,
    MatRipple,
    MatIcon,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    PercentPipe,
    ToolbarComponent,
    ToolbarLogoComponent,
    ScoreChartComponent,
    FooterComponent
  ]
})
export class ProjectsViewComponent {
  private store = inject<Store<ApplicationState>>(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  projects = this.store.selectSignal(ProjectsSelectors.getProjects);

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
      .pipe<ProjectDialogResult>(filter(dialogResult => !!dialogResult));
  }
}
