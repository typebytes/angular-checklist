import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SelectProject } from '../projects/state/projects.actions';
import { ProjectsSelectors } from '../projects/state/projects.selectors';
import { ApplicationState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ProjectExistsGuard {
  constructor(private store: Store<ApplicationState>, private router: Router) {}

  canActivate(snapshot: ActivatedRouteSnapshot) {
    const projectId = snapshot.params.project;

    return this.store.pipe(
      select(ProjectsSelectors.getProjectById(projectId)),
      switchMap(project => {
        if (!project) {
          void this.router.navigate(['/projects']);
          return of(false);
        }

        this.store.dispatch(new SelectProject(projectId));

        return of(true);
      })
    );
  }
}
