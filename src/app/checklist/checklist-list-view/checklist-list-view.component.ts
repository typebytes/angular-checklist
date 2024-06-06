import { Component, Signal, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckAll, ToggleFavorite, ToggleItem, UncheckAll } from '../../projects/state/projects.actions';
import { BreakpointService } from '../../shared/breakpoint.service';
import { ApplicationState } from '../../state/app.state';
import { CategoryEntity, ChecklistFilter, ChecklistItem } from '../models/checklist.model';
import { SetCategoriesFilter } from '../state/checklist.actions';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { ChecklistListItemComponent } from '../checklist-list/checklist-list-item.component';
import { NgFor } from '@angular/common';
import { ChecklistListComponent } from '../checklist-list/checklist-list.component';
import { ChecklistCtaBarComponent } from '../checklist-cta-bar/checklist-cta-bar.component';

@Component({
  standalone: true,
  selector: 'ac-list-view',
  templateUrl: './checklist-list-view.component.html',
  styleUrls: ['./checklist-list-view.component.scss'],
  imports: [ChecklistCtaBarComponent, ChecklistListComponent, NgFor, ChecklistListItemComponent]
})
export class ListViewComponent {
  private store = inject<Store<ApplicationState>>(Store);
  private breakpointService = inject(BreakpointService);
  items = this.store.selectSignal(ChecklistSelectors.getItemsFromSelectedCategory);
  filter = this.store.selectSignal(ChecklistSelectors.getCategoriesFilter);
  showActionButtons = computed(() => this.breakpointService.medium() || this.breakpointService.desktop());

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  setFilter(filter: ChecklistFilter) {
    this.store.dispatch(new SetCategoriesFilter(filter));
  }

  checkAllItems() {
    const categories = this.getSelectedCategory();
    this.store.dispatch(new CheckAll(categories));
  }

  uncheckAllItems() {
    const categories = this.getSelectedCategory();
    this.store.dispatch(new UncheckAll(categories));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }

  trackById(_, item: ChecklistItem) {
    return item.id;
  }

  private get getSelectedCategory(): Signal<CategoryEntity> {
    return this.store.selectSignal(ChecklistSelectors.getSelectedCategory);
  }
}
