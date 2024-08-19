import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export enum Breakpoint {
  Small = 'small',
  Medium = 'medium',
  Desktop = 'desktop'
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakPointObserver = inject(BreakpointObserver);
  readonly small = toSignal(this.breakpoint('(max-width: 600px)'));
  readonly medium = toSignal(this.breakpoint('(min-width: 600px) and (max-width: 992px)'));
  readonly desktop = toSignal(this.breakpoint('(min-width: 992px)'));

  private breakpoint(query: string) {
    return this.breakPointObserver.observe([query]).pipe(map(breakPoint => breakPoint.matches));
  }

  getAllBreakpoints() {
    return {
      [Breakpoint.Small]: this.small,
      [Breakpoint.Medium]: this.medium,
      [Breakpoint.Desktop]: this.desktop
    };
  }

  getBreakpoint(breakpoint: Breakpoint) {
    const breakpoints = this.getAllBreakpoints();
    return breakpoints[breakpoint];
  }
}
