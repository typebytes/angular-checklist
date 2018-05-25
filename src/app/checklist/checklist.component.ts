import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from './models/checklist';
import { ApplicationState } from './state';
import { ChecklistQueries } from './state/checklist.reducer';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('void', style({ height: '0px', display: 'none' })),
      state('*', style({ height: '*', display: 'block' })),
      transition('* <=> *', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class ChecklistComponent implements OnInit {
  categories$: Observable<Array<Category>>;
  favoritesCount$: Observable<number>;
  favoritesScore$: Observable<number>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.categories$ = this.store.pipe(select(ChecklistQueries.getCategories));
    this.favoritesCount$ = this.store.pipe(select(ChecklistQueries.getFavoritesCount));
    this.favoritesScore$ = this.store.pipe(select(ChecklistQueries.getFavoritesScore));
  }

  trackBySlug(index, category: Category) {
    return category.slug;
  }
}
