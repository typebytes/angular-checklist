import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './checklist.component';

const routes: Routes = [{
  path: '', component: ChecklistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
