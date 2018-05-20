import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state';
import { Observable } from 'rxjs';
import { ChecklistQueries } from '../state/checklist.reducer';
import { ChecklistItem } from '../models/checklist';
import { Toggle } from '../state/checklist.actions';

@Component({
  selector: 'app-checklist-detail-view',
  templateUrl: './checklist-detail-view.component.html',
  styleUrls: ['./checklist-detail-view.component.scss']
})
export class ChecklistDetailViewComponent implements OnInit {
  item$: Observable<any>;

  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.item$ = this.store.pipe(select(ChecklistQueries.getSelectedItem));
  }

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new Toggle(item));
  }
}
