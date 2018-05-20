import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ChecklistDetailViewComponent } from './checklist-detail-view/checklist-detail-view.component';
import { ChecklistFavoritesViewComponent } from './checklist-favorites-view/checklist-favorites-view.component';
import { ListViewComponent } from './checklist-list-view/checklist-list-view.component';
import { ChecklistOverviewComponent } from './checklist-overview/checklist-overview.component';
import { ChecklistComponent } from './checklist.component';

const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent,
    children: [
      { path: 'favorites', component: ChecklistFavoritesViewComponent },
      {
        path: '',
        component: ChecklistOverviewComponent,
        children: [
          { path: ':category', component: ListViewComponent },
          { path: ':category/:item', component: ChecklistDetailViewComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), StoreRouterConnectingModule],
  exports: [RouterModule]
})
export class ChecklistRoutingModule {}
