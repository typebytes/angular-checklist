import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'ac-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [MatToolbar]
})
export class ToolbarComponent {}
