import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/checklist', pathMatch: 'full' },
  { path: 'checklist', loadChildren: './checklist/checklist.module#ChecklistModule' },
  { path: '**', redirectTo: '/' }
];
