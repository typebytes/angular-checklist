import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { merge, Observable } from "rxjs";
import { filter, mapTo } from "rxjs/operators";

@Component({
  selector: "ac-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
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
