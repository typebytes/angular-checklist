import { Component } from '@angular/core';
import { AuthorsComponent } from '../authors/authors.component';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'ac-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
  imports: [MatDialogContent, AuthorsComponent]
})
export class AboutDialogComponent {}
