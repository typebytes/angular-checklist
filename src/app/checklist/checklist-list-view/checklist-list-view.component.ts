import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { CheckAll, ToggleFavorite, ToggleItem, UncheckAll } from '../../projects/state/projects.actions';
import { BreakpointService } from '../../shared/breakpoint.service';
import { selectOnce } from '../../shared/operators';
import { ApplicationState } from '../../state/app.state';
import { CategoryEntity, ChecklistFilter, ChecklistItem } from '../models/checklist.model';
import { SetCategoriesFilter } from '../state/checklist.actions';
import { ChecklistSelectors } from '../state/checklist.selectors';

@Component({
  selector: 'ac-list-view',
  templateUrl: './checklist-list-view.component.html',
  styleUrls: ['./checklist-list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  items$: Observable<any>;
  filter$: Observable<ChecklistFilter>;
  showActionButtons$: Observable<boolean>;

  constructor(private store: Store<ApplicationState>, private breakpointService: BreakpointService) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(ChecklistSelectors.getItemsFromSelectedCategory));
    this.filter$ = this.store.pipe(select(ChecklistSelectors.getCategoriesFilter));

    const { medium$, desktop$ } = this.breakpointService.getAllBreakpoints();
    this.showActionButtons$ = combineLatest(medium$, desktop$, (medium, desktop) => medium || desktop);
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  setFilter(filter: ChecklistFilter) {
    this.store.dispatch(new SetCategoriesFilter(filter));
  }

  checkAllItems() {
    this.getSelectedCategory().subscribe(category => this.store.dispatch(new CheckAll(category)));
  }

  uncheckAllItems() {
    this.getSelectedCategory().subscribe(category => this.store.dispatch(new UncheckAll(category)));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }

  trackById(_, item: ChecklistItem) {
    return item.id;
  }

  private getSelectedCategory(): Observable<CategoryEntity> {
    return this.store.pipe(selectOnce(ChecklistSelectors.getSelectedCategory));
  }
}
