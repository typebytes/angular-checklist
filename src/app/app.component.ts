import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AsyncPipe, NgIf, MatProgressBar]
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigationStart$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      mapTo(true)
    );

    const navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mapTo(false)
    );

    this.loading$ = merge(navigationStart$, navigationEnd$);
  }
}
