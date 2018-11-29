import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { pluck, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BreakpointService {
  private _small$: Observable<boolean>;
  private _medium$: Observable<boolean>;
  private _desktop$: Observable<boolean>;

  constructor(private breakPointObserver: BreakpointObserver) {
    this.setupBreakpoints();
  }

  getAllBreakpoints() {
    return {
      small$: this._small$,
      medium$: this._medium$,
      desktop$: this._desktop$
    };
  }

  private setupBreakpoints() {
    const small$ = this.breakPointObserver.observe(["(max-width: 600px)"]).pipe(
      pluck<BreakpointState, boolean>("matches"),
      shareReplay(1)
    );

    const medium$ = this.breakPointObserver
      .observe(["(min-width: 600px) and (max-width: 992px)"])
      .pipe(
        pluck<BreakpointState, boolean>("matches"),
        shareReplay(1)
      );

    const desktop$ = this.breakPointObserver
      .observe(["(min-width: 992px)"])
      .pipe(
        pluck<BreakpointState, boolean>("matches"),
        shareReplay(1)
      );

    this._small$ = small$;
    this._medium$ = medium$;
    this._desktop$ = desktop$;
  }
}
