import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-favorite-button',
  templateUrl: './checklist-favorite-button.component.html',
  styleUrls: ['./checklist-favorite-button.component.scss']
})
export class ChecklistFavoriteButtonComponent {
  _style = {};

  @Input()
  active = false;

  @Input()
  disableRipple = false;

  @Input()
  set size(value) {
    this._style = {
      width: value,
      height: value,
      lineHeight: value
    };
  }

  @Output()
  toggle = new EventEmitter<void>();
}
