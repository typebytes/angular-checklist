import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { AuthorsComponent } from '../authors/authors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [MatToolbar, FontAwesomeModule, AuthorsComponent]
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  showAbout() {
    this.dialog.open(AboutDialogComponent, {
      maxWidth: 600
    });
  }
}
