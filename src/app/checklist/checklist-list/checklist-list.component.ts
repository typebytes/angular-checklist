import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ac-checklist-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./checklist-list.component.scss']
})
export class ChecklistListComponent {}
