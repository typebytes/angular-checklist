import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { ChecklistState } from '../checklist/state/checklist.state';
import { ProjectsState } from '../projects/models/projects.model';

export interface ApplicationState {
  checklist: ChecklistState;
  projects: ProjectsState;
  router: RouterReducerState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['projects'], rehydrate: true })(reducer);
}

const DEFAULT_META_REDUCERS = [localStorageSyncReducer];
const DEV_META_REDUCERS = [storeFreeze, ...DEFAULT_META_REDUCERS];

export const META_REDUCERS = !environment.production ? DEV_META_REDUCERS : DEFAULT_META_REDUCERS;

export const ROOT_REDUCER: ActionReducerMap<Partial<ApplicationState>> = {
  router: routerReducer
};
