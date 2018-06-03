import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChecklistFilter } from '../models/checklist';

@Component({
  selector: 'app-checklist-cta-bar',
  templateUrl: './checklist-cta-bar.component.html',
  styleUrls: ['./checklist-cta-bar.component.scss']
})
export class ChecklistCtaBarComponent {
  @Input() filter: ChecklistFilter;
  @Input() showActionButtons = true;
  @Output() filterChange = new EventEmitter<ChecklistFilter>();
  @Output() checkAll = new EventEmitter<void>();
  @Output() uncheckAll = new EventEmitter<void>();
}
