import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { ChecklistModule } from './checklist/checklist.module';
import { CustomMaterialModule } from './custom-material.module';
import { ProjectsModule } from './projects/projects.module';
import { USER_PROVIDED_META_REDUCERS, ROOT_REDUCER } from './state/app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-checklist' }),
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: USER_PROVIDED_META_REDUCERS
    }),
    ProjectsModule,
    ChecklistModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled'
    }),
    StoreRouterConnectingModule.forRoot({}),
    CustomMaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
