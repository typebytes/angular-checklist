import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomMaterialModule } from '../custom-material.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { PROJECTS_ROUTES } from './projects.routes';
import { projectsReducer } from './state/projects.reducer';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(PROJECTS_ROUTES),
    StoreModule.forFeature('projects', projectsReducer)
  ],
  declarations: [ProjectsViewComponent, ProjectDialogComponent]
})
export class ProjectsModule {}
