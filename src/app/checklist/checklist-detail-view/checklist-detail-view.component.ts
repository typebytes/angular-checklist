import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToggleFavorite, ToggleItem } from '../../projects/state/projects.actions';
import { ApplicationState } from '../../state/app.state';
import { ChecklistItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { markdown } from 'tools/markdown';

@Component({
  selector: 'ac-checklist-detail-view',
  templateUrl: './checklist-detail-view.component.html',
  styleUrls: ['./checklist-detail-view.component.scss']
})
export class ChecklistDetailViewComponent implements OnInit {
  item$: Observable<any>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.item$ = this.store.pipe(select(ChecklistSelectors.getSelectedItem));
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }

  convertMDtoHTML(mdString: string) {
    if (!mdString) {
      return '';
    }
    const value = markdown.render(mdString);
    return value;
  }
}
