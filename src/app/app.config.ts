import { ApplicationConfig } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ROOT_REDUCER, USER_PROVIDED_META_REDUCERS } from './state/app.state';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideRouterStore } from '@ngrx/router-store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { checklistReducer } from './checklist/state/checklist.reducer';
import { projectsReducer } from './projects/state/projects.reducer';
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideStore(ROOT_REDUCER, {
      metaReducers: USER_PROVIDED_META_REDUCERS
    }),
    provideState('checklist', checklistReducer),
    provideState('projects', projectsReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      connectInZone: true
    }),
    provideRouterStore(),

    // material design
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions
    }
  ]
};
