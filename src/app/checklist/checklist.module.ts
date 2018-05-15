import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChecklistRoutingModule } from './checklist-routing.module';
import { ChecklistComponent } from './checklist.component';

@NgModule({
  imports: [
    CommonModule,
    ChecklistRoutingModule
  ],
  declarations: [
    ChecklistComponent
  ]
})
export class ChecklistModule { }
