import { Action, INIT } from '@ngrx/store';
import { ChecklistFilter, ChecklistItem } from '../models/checklist';

export enum ChecklistActionTypes {
  TOGGLE = '[Checklist] Toggle',
  CHECK_ALL = '[Checklist] Check All',
  UNCHECK_ALL = '[Checklist] Uncheck All',
  SET_CATEGORIES_FILTER = '[Checklist] Set Categories Filter',
  SET_FAVORITES_FILTER = '[Checklist] Set Favroites Filter',
  TOGGLE_FAVORITE = '[Checklist] Add Favorite',
  INIT = '@ngrx/store/init'
}

export class Init implements Action {
  readonly type = ChecklistActionTypes.INIT;
}

export class UncheckAll implements Action {
  readonly type = ChecklistActionTypes.UNCHECK_ALL;

  constructor(public payload: string) {}
}

export class CheckAll implements Action {
  readonly type = ChecklistActionTypes.CHECK_ALL;

  constructor(public payload: string) {}
}

export class Toggle implements Action {
  readonly type = ChecklistActionTypes.TOGGLE;

  constructor(public payload: ChecklistItem) {}
}

export class SetCategoriesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_CATEGORIES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export class SetFavoritesFilter implements Action {
  readonly type = ChecklistActionTypes.SET_FAVORITES_FILTER;

  constructor(public payload: ChecklistFilter) {}
}

export class ToggleFavorite implements Action {
  readonly type = ChecklistActionTypes.TOGGLE_FAVORITE;

  constructor(public payload: { category: string; id: string }) {}
}

export type ChecklistActions =
  | Init
  | Toggle
  | CheckAll
  | UncheckAll
  | SetCategoriesFilter
  | SetFavoritesFilter
  | ToggleFavorite;
