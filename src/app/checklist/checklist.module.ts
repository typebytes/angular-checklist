import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomMaterialModule } from '../custom-material.module';
import { SharedModule } from '../shared/shared.module';
import { ChecklistCtaBarComponent } from './checklist-cta-bar/checklist-cta-bar.component';
import { ChecklistDetailViewComponent } from './checklist-detail-view/checklist-detail-view.component';
import { ChecklistFavoriteButtonComponent } from './checklist-favorite-button/checklist-favorite-button.component';
import { ChecklistFavoritesViewComponent } from './checklist-favorites-view/checklist-favorites-view.component';
import { ChecklistMetadataComponent } from './checklist-item-metadata/checklist-metadata.component';
import { ListViewComponent } from './checklist-list-view/checklist-list-view.component';
import { ChecklistListItemComponent } from './checklist-list/checklist-list-item.component';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ChecklistOverviewComponent } from './checklist-overview/checklist-overview.component';
import { ChecklistSearchComponent } from './checklist-search/checklist-search.component';
import { ChecklistComponent } from './checklist.component';
import { CHECKLIST_ROUTES } from './checklist.routes';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SearchService } from './search/search.service';
import { checklistReducer } from './state/checklist.reducer';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(CHECKLIST_ROUTES),
    StoreModule.forFeature('checklist', checklistReducer)
  ],
  declarations: [
    ChecklistComponent,
    ListViewComponent,
    ChecklistDetailViewComponent,
    ChecklistFavoritesViewComponent,
    ChecklistOverviewComponent,
    ChecklistFavoritesViewComponent,
    ChecklistMetadataComponent,
    ChecklistListComponent,
    ChecklistListItemComponent,
    ChecklistCtaBarComponent,
    ChecklistFavoriteButtonComponent,
    ConfirmationDialogComponent,
    ChecklistSearchComponent
  ],
  providers: [SearchService]
})
export class ChecklistModule {}
