import { Action } from '@ngrx/store';
import { ChecklistFilter } from '../models/checklist.model';

export enum ChecklistActionTypes {
  SET_CATEGORIES_FILTER = '[Checklist] set categories filter',
  SET_FAVORITES_FILTER = '[Checklist] set favroites filter'
}

export class SetCategoriesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_CATEGORIES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export class SetFavoritesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_FAVORITES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export type ChecklistActions = SetCategoriesFilter | SetFavoritesFilter;
