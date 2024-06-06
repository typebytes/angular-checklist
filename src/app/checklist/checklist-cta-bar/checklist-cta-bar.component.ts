import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChecklistFilter } from '../models/checklist.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'ac-checklist-cta-bar',
  templateUrl: './checklist-cta-bar.component.html',
  styleUrls: ['./checklist-cta-bar.component.scss'],
  imports: [NgIf, MatButton, MatIcon, MatTooltip]
})
export class ChecklistCtaBarComponent {
  @Input() filter: ChecklistFilter;
  @Input() showActionButtons = true;
  @Output() filterChange = new EventEmitter<ChecklistFilter>();
  @Output() checkAll = new EventEmitter<void>();
  @Output() uncheckAll = new EventEmitter<void>();
}
