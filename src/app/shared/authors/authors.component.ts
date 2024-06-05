import { Component, inject } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'ac-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  imports: [FontAwesomeModule]
})
export class AuthorsComponent {
  library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faTwitter, faHeart);
  }
}
