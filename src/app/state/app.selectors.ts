import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChecklistState } from '../checklist/state/checklist.state';
import { ProjectsState } from '../projects/models/projects.model';

export namespace AppSelectors {
  export const getChecklistState = createFeatureSelector<ChecklistState>('checklist');
  export const getProjectsState = createFeatureSelector<ProjectsState>('projects');
  export const getRouterReducerState = createFeatureSelector<RouterReducerState>('router');

  export const getRouterState = createSelector(
    getRouterReducerState,
    router => router.state
  );

  export const getCategoryEntities = createSelector(
    getChecklistState,
    checklist => checklist.categories
  );

  export const getItemEntities = createSelector(
    getChecklistState,
    checklist => checklist.items
  );
}
