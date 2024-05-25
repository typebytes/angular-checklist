import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'ac-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  imports: [FontAwesomeModule]
})
export class AuthorsComponent {}
