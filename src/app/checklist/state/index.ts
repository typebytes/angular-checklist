import { RouterReducerState, SerializedRouterStateSnapshot, routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ChecklistState, checklistReducer } from './checklist.reducer';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface ApplicationState {
  checklist: ChecklistState;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['checklist'], rehydrate: true })(reducer);
}

const DEFAULT_META_REDUCERS = [localStorageSyncReducer];
export const META_REDUCERS = !environment.production ? [storeFreeze, ...DEFAULT_META_REDUCERS] : DEFAULT_META_REDUCERS;

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  checklist: checklistReducer,
  router: routerReducer
};
