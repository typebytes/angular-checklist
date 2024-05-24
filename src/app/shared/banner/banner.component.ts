import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'ac-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  imports: [FontAwesomeModule]
})
export class BannerComponent {}
