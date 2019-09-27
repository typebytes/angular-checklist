import { Action } from '@ngrx/store';
import { ChecklistFilter, CheckList } from '../models/checklist.model';

export enum ChecklistActionTypes {
  GET_CHECK_LIST = '[Checklist] get check list',
  GET_CHECK_LIST_SUCCESS = '[Checklist] get check list success',
  SET_CATEGORIES_FILTER = '[Checklist] set categories filter',
  SET_FAVORITES_FILTER = '[Checklist] set favroites filter',
  TOGGLE_EDIT_MODE = '[Checklist] toggle edit mode',
  CLEAN_CHECK_LIST = '[Checklist] clean check list',
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

export class CleanCheckList implements Action {
  readonly type = ChecklistActionTypes.CLEAN_CHECK_LIST;

  constructor() {}
}


export class GetCheckList implements Action {
  public readonly type = ChecklistActionTypes.GET_CHECK_LIST;
}

export class GetCheckListSuccess implements Action {
  public readonly type = ChecklistActionTypes.GET_CHECK_LIST_SUCCESS;
  constructor(public payload: CheckList) {}
}

export type ChecklistActions = SetCategoriesFilter
  | SetFavoritesFilter
  | ToggleEditMode
  | GetCheckList
  | GetCheckListSuccess
  | CleanCheckList;
