import { Action } from '@ngrx/store';
import { ChecklistFilter } from '../models/checklist.model';

export enum ChecklistActionTypes {
  SET_CATEGORIES_FILTER = '[Checklist] set categories filter',
  SET_FAVORITES_FILTER = '[Checklist] set favroites filter',
  TOGGLE_EDIT_MODE = '[Checklist] toggle edit mode'
}

export class SetCategoriesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_CATEGORIES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export class SetFavoritesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_FAVORITES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export class ToggleEditMode implements Action {
  readonly type = ChecklistActionTypes.TOGGLE_EDIT_MODE;

  constructor() {}
}

export type ChecklistActions = SetCategoriesFilter | SetFavoritesFilter | ToggleEditMode;
