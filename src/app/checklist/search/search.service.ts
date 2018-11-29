import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import * as fuzzysort from 'fuzzysort';
import { merge, of, zip } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ProjectsActionTypes } from '../../projects/state/projects.actions';
import { ProjectsSelectors } from '../../projects/state/projects.selectors';
import { AppSelectors } from '../../state/app.selectors';
import { ApplicationState } from '../../state/app.state';
import { CategoryEntities, CategoryEntity, ChecklistItem, ItemEntities } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { IndexEntry } from './search.models';

@Injectable()
export class SearchService {
  private index: Array<IndexEntry<ChecklistItem | CategoryEntity>>;

  private options: Fuzzysort.KeyOptions = {
    key: 'value.title',
    allowTypo: false,
    limit: 100,
    threshold: -10000
  };

  constructor(private store: Store<ApplicationState>, private actions: ActionsSubject) {
    const actions$ = this.actions.pipe(filter(action => action.type === ProjectsActionTypes.TOGGLE_CATEGORY));

    merge(actions$, of('INIT INDEX'))
      .pipe(switchMap(_ => this.getStoreData()))
      .subscribe(([categories, items, projectId]) => {
        this.index = this.createIndex(categories, items, projectId);
      });
  }

  search(term: string) {
    return of(fuzzysort.go(term, this.index, this.options));
  }

  createIndex(categoryEntities: CategoryEntities, itemEntities: ItemEntities, projectId: string) {
    const categories = Object.values(categoryEntities).map(category => this.compileCategory(category, projectId));
    const items = categories.reduce(this.compileCategoryItems(itemEntities, projectId), []);
    return [...categories, ...items];
  }

  private getStoreData() {
    return zip(
      this.store.pipe(select(ChecklistSelectors.getActiveCategoryEntities)),
      this.store.pipe(select(AppSelectors.getItemEntities)),
      this.store.pipe(select(ProjectsSelectors.getSelectedProjectId))
    ).pipe(take(1));
  }

  private compileCategory(category: CategoryEntity, projectId: string) {
    return {
      value: category,
      link: `${this.getBaseLink(projectId)}/${category.slug}`
    };
  }

  private compileCategoryItems(itemEntities: ItemEntities, projectId: string) {
    return (acc: Array<IndexEntry<ChecklistItem>>, category: IndexEntry<CategoryEntity>) => {
      return acc.concat(
        category.value.items.map(itemId => {
          const checklistItem = itemEntities[itemId];
          return {
            value: checklistItem,
            link: `${this.getBaseLink(projectId)}/${checklistItem.category}/${checklistItem.id}`
          };
        })
      );
    };
  }

  private getBaseLink(projectId: string) {
    return `/${projectId}/checklist`;
  }
}
