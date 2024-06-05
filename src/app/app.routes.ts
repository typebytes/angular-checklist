import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'projects', loadChildren: () => import('./projects/projects.routes').then(m => m.PROJECTS_ROUTES) },
  {
    path: ':project/checklist',
    loadChildren: () => import('./checklist/checklist.routes').then(m => m.CHECKLIST_ROUTES)
  },
  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];
