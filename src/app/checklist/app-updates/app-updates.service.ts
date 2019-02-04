import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import {
  fromEvent as observableFromEvent,
  interval,
  merge as observableMerge,
  Observable,
  of as observableOf
} from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {
  constructor(public snackbar: MatSnackBar, private serviceWorkerUpdates: SwUpdate, private appRef: ApplicationRef) {}

  checkAppStability(): Observable<Boolean> {
    const appIsStable = this.appRef.isStable.pipe(first(isStable => isStable === true));
    return appIsStable;
  }

  checkUpdatesAuto() {
    this.serviceWorkerUpdates.activated.subscribe(() => {
      this.snackbar.open('App updated', 'OK', { duration: 2000 });
    });

    this.serviceWorkerUpdates.available
      .pipe(
        switchMap(() => {
          const updateSnackbar = this.snackbar.open('Update available!', 'Update Now');
          return updateSnackbar.onAction().pipe(tap(() => updateSnackbar.dismiss()));
        })
      )
      .subscribe(() => window.location.reload());
  }

  checkUpdatesManually() {
    this.snackbar.open(`You'll be notified if an update exists...`, 'OK', {
      duration: 4000
    });

    interval(6 * 60 * 60).subscribe(() => {
      this.serviceWorkerUpdates.checkForUpdate();
    });
  }

  checkConnectionStatus(): Observable<boolean> {
    return observableMerge(
      observableOf(navigator.onLine),
      observableFromEvent(window, 'online').pipe(map(() => true)),
      observableFromEvent(window, 'offline').pipe(map(() => false))
    );
  }
}
