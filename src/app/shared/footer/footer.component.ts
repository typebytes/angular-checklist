import { Component, Inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isBrowser: boolean;

  public readonly languages = [
    {
      code: 'en-US',
      text: 'English'
    },
    {
      code: 'ja',
      text: '日本語'
    }
  ];

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId,
    private dialog: MatDialog
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  showAbout() {
    this.dialog.open(AboutDialogComponent, {
      maxWidth: 600
    });
  }

  changeLangage(lang) {
    if (this.isBrowser) {
      location.assign(`/${lang}${location.pathname.replace(`/${this.locale}`, '')}`);
    }
  }

  transrationUrl(lang: string) {
    if (this.isBrowser) {
      return `/${lang}${location.pathname.replace(`/${this.locale}`, '')}`;
    } else {
      return '';
    }
  }
}
