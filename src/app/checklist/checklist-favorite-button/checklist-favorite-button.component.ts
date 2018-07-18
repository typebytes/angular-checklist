import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-favorite-button',
  templateUrl: './checklist-favorite-button.component.html',
  styleUrls: ['./checklist-favorite-button.component.scss']
})
export class ChecklistFavoriteButtonComponent {
  @Input() active = false;
  @Output() toggle = new EventEmitter<void>();
}
