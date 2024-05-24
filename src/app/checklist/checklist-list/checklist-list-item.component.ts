import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChecklistItem } from '../models/checklist.model';
import { ChecklistFavoriteButtonComponent } from '../checklist-favorite-button/checklist-favorite-button.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'ac-checklist-list-item',
  templateUrl: './checklist-list-item.component.html',
  styleUrls: ['./checklist-list-item.component.scss'],
  imports: [MatCheckbox, RouterLink, NgIf, ChipComponent, ChecklistFavoriteButtonComponent]
})
export class ChecklistListItemComponent {
  @Input() item: ChecklistItem;
  @Output() toggleItem = new EventEmitter<ChecklistItem>();
  @Output() toggleFavorite = new EventEmitter<ChecklistItem>();
}
