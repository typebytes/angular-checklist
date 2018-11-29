import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Author } from '../models/checklist.model';

@Component({
  selector: 'ac-checklist-metadata',
  templateUrl: './checklist-metadata.component.html',
  styleUrls: ['./checklist-metadata.component.scss']
})
export class ChecklistMetadataComponent {
  @Input() author: Author;
  @Input() source: string;
}
