import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBan,
  faBell,
  faHandsHelping,
  faHeart,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import { CustomMaterialModule } from "../custom-material.module";

import {
  DropdownStaticOptionComponent,
  DropdownStaticOptionsComponent
} from "./dropdown/dropdown-static-options.component";

import { DropdownComponent } from "./dropdown/dropdown.component";
import { FooterComponent } from "./footer/footer.component";
import { ScoreChartComponent } from "./score-chart/score-chart.component";
import { ToolbarLogoComponent } from "./toolbar/toolbar-logo/toolbar-logo.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";
import { AuthorsComponent } from "./authors/authors.component";

library.add(
  faGithub,
  faTwitter,
  faHeart,
  faHandsHelping,
  faBell,
  faBan,
  faInfo
);

const COMPONENTS = [
  FooterComponent,
  ToolbarComponent,
  ToolbarLogoComponent,
  DropdownComponent,
  DropdownStaticOptionComponent,
  DropdownStaticOptionsComponent,
  ScoreChartComponent,
  AboutDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    CustomMaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS, AuthorsComponent],
  exports: [...COMPONENTS],
  entryComponents: [AboutDialogComponent]
})
export class SharedModule {}
