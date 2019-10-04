import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { GetProjectsSuccess, GetProjects, ProjectsActionTypes, AddProject } from './projects.actions';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { Project } from '../models/projects.model';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { AddCheckListViewComponent } from 'src/app/checklist/add-checklist-view/add-checklist-view.component';

@Injectable()
export class ProjectEffects {
  @Effect()
  $getProjects = this._action$.pipe(
    ofType<GetProjects>(ProjectsActionTypes.GET_PROJECTS),
    switchMap(() => this._projectService.getProjects()),
    switchMap((data: any) => {
      console.log(data);
      const projects = JSON.parse(data.Output.Body) as Array<Project>;
      return of(new GetProjectsSuccess(projects));
    })
  );

  @Effect()
  $addProject = this._action$.pipe(
    ofType<AddProject>(ProjectsActionTypes.ADD_PROJECT),
    map(action => action.payload),
    switchMap((data) => {
      return this._projectService.addNewProject(data);
    }),
    switchMap((projects: any) => {
      debugger;
      return of(new GetProjectsSuccess(projects));
    })
  );
  constructor(private _action$: Actions, private _projectService: ProjectService) {

  }
}
