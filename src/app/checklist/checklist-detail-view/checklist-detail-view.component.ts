import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleFavorite, ToggleItem } from '../../projects/state/projects.actions';
import { ApplicationState } from '../../state/app.state';
import { ChecklistItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { BannerComponent } from '../../shared/banner/banner.component';
import { ChecklistMetadataComponent } from '../checklist-item-metadata/checklist-metadata.component';
import { ChecklistFavoriteButtonComponent } from '../checklist-favorite-button/checklist-favorite-button.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'ac-checklist-detail-view',
  templateUrl: './checklist-detail-view.component.html',
  styleUrls: ['./checklist-detail-view.component.scss'],
  imports: [MatCheckbox, ChecklistFavoriteButtonComponent, ChecklistMetadataComponent, BannerComponent]
})
export class ChecklistDetailViewComponent {
  private store = inject<Store<ApplicationState>>(Store);
  item = this.store.selectSignal<any>(ChecklistSelectors.getSelectedItem);

  toggleItem(item: ChecklistItem) {
    this.store.dispatch(new ToggleItem(item));
  }

  toggleFavorite(item: ChecklistItem) {
    this.store.dispatch(new ToggleFavorite(item));
  }
}
