import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', loadChildren: './landing-page/landing-page.module#LandingPageModule', pathMatch: 'full' },
  { path: 'checklist', loadChildren: './checklist/checklist.module#ChecklistModule' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
