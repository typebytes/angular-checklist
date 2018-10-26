import { NgModule } from '@angular/core';

import {
  MAT_CHECKBOX_CLICK_ACTION,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }]
})
export class ChecklistMaterialModule {}
