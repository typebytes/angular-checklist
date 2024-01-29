import { Component, Input } from '@angular/core';

@Component({
  selector: 'ac-toolbar-logo',
  templateUrl: './toolbar-logo.component.html',
  styleUrls: ['./toolbar-logo.component.scss']
})
export class ToolbarLogoComponent {
  @Input() showText = true;
}
