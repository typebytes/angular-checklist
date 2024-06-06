import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ac-dropdown-static-options',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./dropdown-static-options.component.scss']
})
export class DropdownStaticOptionsComponent {}

@Component({
  standalone: true,
  selector: 'ac-dropdown-static-option',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./dropdown-static-option.component.scss']
})
export class DropdownStaticOptionComponent {}
