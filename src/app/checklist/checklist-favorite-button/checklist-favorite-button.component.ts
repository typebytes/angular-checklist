import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { MatIconButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'ac-checklist-favorite-button',
  templateUrl: './checklist-favorite-button.component.html',
  styleUrls: ['./checklist-favorite-button.component.scss'],
  imports: [MatIconButton, NgStyle, MatIcon]
})
export class ChecklistFavoriteButtonComponent {
  _style = {};

  @Input() active = false;
  @Input() disableRipple = false;

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
