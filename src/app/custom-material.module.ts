import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';

@NgModule({
  exports: [
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressBarModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }]
})
export class CustomMaterialModule {}
