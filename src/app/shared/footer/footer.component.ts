import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AboutDialogComponent } from "../about-dialog/about-dialog.component";

@Component({
  selector: "ac-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  showAbout() {
    this.dialog.open(AboutDialogComponent, {
      maxWidth: 600
    });
  }
}
