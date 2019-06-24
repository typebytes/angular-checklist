import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { ChecklistModule } from './checklist/checklist.module';
import { CustomMaterialModule } from './custom-material.module';
import { ProjectsModule } from './projects/projects.module';
import { META_REDUCERS, ROOT_REDUCER, ApplicationState } from './state/app.state';
import { SetLangageCode } from './checklist/state/checklist.actions';

registerLocaleData(localeJa, 'ja');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-checklist' }),
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers: META_REDUCERS }),
    ProjectsModule,
    ChecklistModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    StoreRouterConnectingModule.forRoot(),
    CustomMaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(LOCALE_ID) locale: string, store: Store<ApplicationState>) {
    store.dispatch(new SetLangageCode(locale));
  }
}
