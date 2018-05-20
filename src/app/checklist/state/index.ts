import { RouterReducerState, SerializedRouterStateSnapshot, routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ChecklistState, checklistReducer } from './checklist.reducer';

export interface ApplicationState {
  checklist: ChecklistState;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['checklist'], rehydrate: true })(reducer);
}

export const META_REDUCERS = [localStorageSyncReducer];

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  checklist: checklistReducer,
  router: routerReducer
};
