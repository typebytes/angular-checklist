import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ChecklistDetailViewComponent } from './checklist-detail-view/checklist-detail-view.component';
import { ChecklistFavoritesViewComponent } from './checklist-favorites-view/checklist-favorites-view.component';
import { ChecklistMetadataComponent } from './checklist-item-metadata/checklist-metadata.component';
import { ListViewComponent } from './checklist-list-view/checklist-list-view.component';
import { ChecklistListItemComponent } from './checklist-list/checklist-list-item.component';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ChecklistMaterialModule } from './checklist-material.module';
import { ChecklistOverviewComponent } from './checklist-overview/checklist-overview.component';
import { ChecklistRoutingModule } from './checklist-routing.module';
import { ChecklistScoreChartComponent } from './checklist-score-chart/checklist-score-chart.component';
import { ChecklistComponent } from './checklist.component';
import { META_REDUCERS, ROOT_REDUCER } from './state';
import { ChecklistCtaBarComponent } from './checklist-cta-bar/checklist-cta-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ChecklistRoutingModule,
    ChecklistMaterialModule,
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers: META_REDUCERS }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  declarations: [
    ChecklistComponent,
    ListViewComponent,
    ChecklistDetailViewComponent,
    ChecklistFavoritesViewComponent,
    ChecklistOverviewComponent,
    ChecklistFavoritesViewComponent,
    ChecklistScoreChartComponent,
    ChecklistMetadataComponent,
    ChecklistListComponent,
    ChecklistListItemComponent,
    ChecklistCtaBarComponent
  ]
})
export class ChecklistModule {}
