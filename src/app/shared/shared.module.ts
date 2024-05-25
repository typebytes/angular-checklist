import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBan, faBell, faHandsHelping, faHeart, faInfo, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
  imports: [FontAwesomeModule, CustomMaterialModule]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faGithub, faTwitter, faHeart, faHandsHelping, faBell, faBan, faInfo, faCircleInfo);
  }
}
