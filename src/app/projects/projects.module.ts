import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { PROJECTS_ROUTES } from './projects.routes';
import { projectsReducer } from './state/projects.reducer';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(PROJECTS_ROUTES), StoreModule.forFeature('projects', projectsReducer)]
})
export class ProjectsModule {}
