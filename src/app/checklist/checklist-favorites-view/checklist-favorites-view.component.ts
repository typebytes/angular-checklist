import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleFavorite, ToggleItem } from '../../projects/state/projects.actions';
import { ApplicationState } from '../../state/app.state';
import { ChecklistFilter, ChecklistItem, Favorite } from '../models/checklist.model';
import { SetFavoritesFilter } from '../state/checklist.actions';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { ChecklistListItemComponent } from '../checklist-list/checklist-list-item.component';
import { ChecklistListComponent } from '../checklist-list/checklist-list.component';
import { ChecklistCtaBarComponent } from '../checklist-cta-bar/checklist-cta-bar.component';

@Component({
  standalone: true,
  selector: 'ac-checklist-favorites-view',
  templateUrl: './checklist-favorites-view.component.html',
  styleUrls: ['./checklist-favorites-view.component.scss'],
  imports: [ChecklistCtaBarComponent, ChecklistListComponent, ChecklistListItemComponent]
})
export class ChecklistFavoritesViewComponent {
  private store = inject<Store<ApplicationState>>(Store);
  favorites = this.store.selectSignal(ChecklistSelectors.getFilteredFavorites);
  filter = this.store.selectSignal(ChecklistSelectors.getFavoritesFilter);

  setFilter(filter: ChecklistFilter) {
    this.store.dispatch(new SetFavoritesFilter(filter));
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }
}
