import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import * as fuzzysort from 'fuzzysort';
import { merge, of, zip } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CategoryEntity, CategoryMap, ChecklistItem, IndexEntry, ItemMap } from '../models/checklist';
import { ApplicationState } from '../state';
import { ChecklistActionTypes } from '../state/checklist.actions';
import { ChecklistQueries } from '../state/checklist.reducer';

@Injectable()
export class SearchService {
  private baseLink = '/checklist';

  private index: Array<IndexEntry<ChecklistItem | CategoryEntity>>;

  private options: Fuzzysort.KeyOptions = {
    key: 'value.title',
    allowTypo: false,
    limit: 100,
    threshold: -10000
  };

  constructor(private store: Store<ApplicationState>, private actions: ActionsSubject) {
    const actions$ = this.actions.pipe(filter(action => action.type === ChecklistActionTypes.TOGGLE_CATEGORY));

    merge(actions$, of('INIT INDEX'))
      .pipe(switchMap(_ => this.getStoreData()))
      .subscribe(([categories, items]) => {
        this.index = this.createIndex(categories, items);
      });
  }

  search(term: string) {
    return of(fuzzysort.go(term, this.index, this.options));
  }

  createIndex(categoryEntities: CategoryMap, itemEntities: ItemMap) {
    const categories = Object.values(categoryEntities).map(category => this.compileCategory(category));
    const items = categories.reduce(this.compileCategoryItems(itemEntities), []);
    return [...categories, ...items];
  }

  private getStoreData() {
    return zip(
      this.store.pipe(select(ChecklistQueries.getActiveCategoryEntities)),
      this.store.pipe(select(ChecklistQueries.getItemEntities))
    ).pipe(take(1));
  }

  private compileCategory(category: CategoryEntity) {
    return {
      value: category,
      link: `${this.baseLink}/${category.slug}`
    };
  }

  private compileCategoryItems(itemEntities: ItemMap) {
    return (acc: Array<IndexEntry<ChecklistItem>>, category: IndexEntry<CategoryEntity>) => {
      return acc.concat(
        category.value.items.map(itemId => {
          const checklistItem = itemEntities[itemId];
          return {
            value: checklistItem,
            link: `${this.baseLink}/${checklistItem.category}/${checklistItem.id}`
          };
        })
      );
    };
  }
}
