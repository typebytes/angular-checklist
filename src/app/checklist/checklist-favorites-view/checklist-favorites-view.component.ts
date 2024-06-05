import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToggleFavorite, ToggleItem } from '../../projects/state/projects.actions';
import { ApplicationState } from '../../state/app.state';
import { ChecklistFilter, ChecklistItem, Favorite } from '../models/checklist.model';
import { SetFavoritesFilter } from '../state/checklist.actions';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { ChecklistListItemComponent } from '../checklist-list/checklist-list-item.component';
import { ChecklistListComponent } from '../checklist-list/checklist-list.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ChecklistCtaBarComponent } from '../checklist-cta-bar/checklist-cta-bar.component';

@Component({
  standalone: true,
  selector: 'ac-checklist-favorites-view',
  templateUrl: './checklist-favorites-view.component.html',
  styleUrls: ['./checklist-favorites-view.component.scss'],
  imports: [ChecklistCtaBarComponent, NgIf, NgFor, ChecklistListComponent, ChecklistListItemComponent, AsyncPipe]
})
export class ChecklistFavoritesViewComponent implements OnInit {
  favorites$: Observable<Array<Favorite>>;
  filter$: Observable<ChecklistFilter>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.favorites$ = this.store.pipe(select(ChecklistSelectors.getFilteredFavorites));
    this.filter$ = this.store.pipe(select(ChecklistSelectors.getFavoritesFilter));
  }

  setFilter(filter: ChecklistFilter) {
    this.store.dispatch(new SetFavoritesFilter(filter));
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }

  trackByCategoryTitle(_, favorite: Favorite) {
    return favorite.category.title;
  }

  trackById(_, item: ChecklistItem) {
    return item.id;
  }
}
