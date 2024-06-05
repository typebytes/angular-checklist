import { Component, Input } from '@angular/core';
import { Author } from '../models/checklist.model';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ac-checklist-metadata',
  templateUrl: './checklist-metadata.component.html',
  styleUrls: ['./checklist-metadata.component.scss'],
  imports: [NgIf]
})
export class ChecklistMetadataComponent {
  @Input() author: Author;
  @Input() source: string;
}
