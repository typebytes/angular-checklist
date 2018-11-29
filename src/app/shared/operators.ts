import { BreakpointState } from "@angular/cdk/layout";
import { select } from "@ngrx/store";
import { pipe, Observable } from "rxjs";
import { filter, take } from "rxjs/operators";

export const matches = pipe(
  filter((result: BreakpointState) => result.matches)
);

export const selectOnce = query => {
  return (source: Observable<any>) => {
    return source.pipe(
      select(query),
      take(1)
    );
  };
};
