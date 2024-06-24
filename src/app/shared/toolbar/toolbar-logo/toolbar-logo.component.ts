import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ac-toolbar-logo',
  templateUrl: './toolbar-logo.component.html',
  styleUrls: ['./toolbar-logo.component.scss'],
  imports: [RouterLink]
})
export class ToolbarLogoComponent {
  @Input() showText = true;
}
