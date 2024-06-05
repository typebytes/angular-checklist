import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToggleFavorite, ToggleItem } from '../../projects/state/projects.actions';
import { ApplicationState } from '../../state/app.state';
import { ChecklistItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { BannerComponent } from '../../shared/banner/banner.component';
import { ChecklistMetadataComponent } from '../checklist-item-metadata/checklist-metadata.component';
import { ChecklistFavoriteButtonComponent } from '../checklist-favorite-button/checklist-favorite-button.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ac-checklist-detail-view',
  templateUrl: './checklist-detail-view.component.html',
  styleUrls: ['./checklist-detail-view.component.scss'],
  imports: [NgIf, MatCheckbox, ChecklistFavoriteButtonComponent, ChecklistMetadataComponent, BannerComponent, AsyncPipe]
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
}
