import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreakpointState } from '@angular/cdk/layout';

export const matches = pipe(filter((result: BreakpointState) => result.matches));
