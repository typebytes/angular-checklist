import { Action } from '@ngrx/store';
import { CategoryEntity, ChecklistItem } from '../../checklist/models/checklist.model';
import { Project } from '../models/projects.model';

export enum ProjectsActionTypes {
  TOGGLE_ITEM = '[Projects] toggle item',
  TOGGLE_CATEGORY = '[Projects] toggle category',
  ADD_PROJECT = '[Projects] add project',
  DELETE_PROJECT = '[Projects] delete project',
  EDIT_PROJECT = '[Projects] edit project',
  SELECT_PROJECT = '[Projects] select project',
  CHECK_ALL = '[Projects] check all',
  UNCHECK_ALL = '[Projects] uncheck all',
  TOGGLE_FAVORITE = '[Projects] add favorite',
  TOGGLE_ALL_FAVORITES = '[Projects] toggle all favorites'
}

export class UncheckAll implements Action {
  readonly type = ProjectsActionTypes.UNCHECK_ALL;

  constructor(public payload: CategoryEntity) {}
}

export class CheckAll implements Action {
  readonly type = ProjectsActionTypes.CHECK_ALL;

  constructor(public payload: CategoryEntity) {}
}

export class ToggleItem implements Action {
  readonly type = ProjectsActionTypes.TOGGLE_ITEM;

  constructor(public payload: ChecklistItem) {}
}

export class ToggleCategory implements Action {
  readonly type = ProjectsActionTypes.TOGGLE_CATEGORY;

  constructor(public payload: string) {}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.ADD_PROJECT;

  constructor(public payload: Partial<Project>) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DELETE_PROJECT;

  constructor(public payload: string) {}
}

export class EditProject implements Action {
  readonly type = ProjectsActionTypes.EDIT_PROJECT;

  constructor(public payload: { current: Project; updated: Partial<Project> }) {}
}

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SELECT_PROJECT;

  constructor(public payload: string) {}
}

export class ToggleFavorite implements Action {
  readonly type = ProjectsActionTypes.TOGGLE_FAVORITE;

  constructor(public payload: ChecklistItem) {}
}

export class ToggleAllFavorites implements Action {
  readonly type = ProjectsActionTypes.TOGGLE_ALL_FAVORITES;

  constructor(public payload: Array<ChecklistItem>) {}
}

export type ProjectsActions =
  | ToggleCategory
  | AddProject
  | DeleteProject
  | EditProject
  | SelectProject
  | ToggleItem
  | CheckAll
  | UncheckAll
  | ToggleFavorite
  | ToggleAllFavorites;
