import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { AuthorsComponent } from '../authors/authors.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbar } from '@angular/material/toolbar';
import { faHandsHelping, faInfo } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  standalone: true,
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [MatToolbar, FontAwesomeModule, AuthorsComponent]
})
export class FooterComponent {
  library = inject(FaIconLibrary);

  constructor(private dialog: MatDialog) {
    this.library.addIcons(faGithub, faHandsHelping, faInfo);
  }

  showAbout() {
    this.dialog.open(AboutDialogComponent, {
      maxWidth: 600
    });
  }
}
