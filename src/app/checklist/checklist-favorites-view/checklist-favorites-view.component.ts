import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChecklistFilter, ChecklistItem, Favorite } from '../models/checklist';
import { ApplicationState } from '../state';
import { Toggle, ToggleFavorite, SetFavoritesFilter } from '../state/checklist.actions';
import { ChecklistQueries } from '../state/checklist.reducer';

@Component({
  selector: 'app-checklist-favorites-view',
  templateUrl: './checklist-favorites-view.component.html',
  styleUrls: ['./checklist-favorites-view.component.scss']
})
export class ChecklistFavoritesViewComponent implements OnInit {
  favorites$: Observable<Array<Favorite>>;
  filter$: Observable<ChecklistFilter>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.favorites$ = this.store.pipe(select(ChecklistQueries.getFilteredFavorites));
    this.filter$ = this.store.pipe(select(ChecklistQueries.getFavroitesFilter));
  }

  setFilter(filter: ChecklistFilter) {
    this.store.dispatch(new SetFavoritesFilter(filter));
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new Toggle(item));
  }

  toggleFavorite(item: ChecklistItem, categoryId: string) {
    this.store.dispatch(new ToggleFavorite({ id: item.id, category: categoryId }));
  }

  trackByCategoryTitle(index, favorite: Favorite) {
    return favorite.category.title;
  }
}
