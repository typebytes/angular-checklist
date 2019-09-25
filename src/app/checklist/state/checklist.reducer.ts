import { Filter } from '../models/checklist.model';
import { ChecklistActions, ChecklistActionTypes } from './checklist.actions';
import { ChecklistState } from './checklist.state';

const CHECKLIST = require('../../../assets/content.json');

export const INITIAL_STATE: ChecklistState = {
  ...CHECKLIST,
  filter: {
    categories: 'ALL',
    favorites: 'ALL'
  },
  editMode: false
};

export function checklistReducer(state = INITIAL_STATE, action: ChecklistActions) {
  switch (action.type) {
    case ChecklistActionTypes.GET_CHECK_LIST_SUCCESS:
      const data = action.payload;
      debugger; // TODO
      return {};
    case ChecklistActionTypes.SET_CATEGORIES_FILTER:
    case ChecklistActionTypes.SET_FAVORITES_FILTER:
      return {
        ...state,
        filter: filterReducer(state.filter, action)
      };
    case ChecklistActionTypes.TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode
      };
    default:
      return state;
  }
}

export const filterReducer = (state: Filter, action: ChecklistActions) => {
  switch (action.type) {
    case ChecklistActionTypes.SET_CATEGORIES_FILTER:
      return {
        ...state,
        categories: action.payload
      };
    case ChecklistActionTypes.SET_FAVORITES_FILTER:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};
