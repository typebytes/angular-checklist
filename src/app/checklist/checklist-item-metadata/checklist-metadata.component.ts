import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Author } from '../models/checklist';

@Component({
  selector: 'app-checklist-metadata',
  templateUrl: './checklist-metadata.component.html',
  styleUrls: ['./checklist-metadata.component.scss']
})
export class ChecklistMetadataComponent {
  @Input() author: Author;
  @Input() source: string;
}
