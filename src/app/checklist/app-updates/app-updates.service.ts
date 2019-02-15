import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { fromEvent as observableFromEvent, merge as observableMerge, Observable, of as observableOf } from 'rxjs';
import { first, mapTo, switchMap, tap } from 'rxjs/operators';

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
    const updateCheckSnackbar = this.snackbar.open(`Checking for updates...`);

    this.serviceWorkerUpdates
      .checkForUpdate()
      .then(() => {
        updateCheckSnackbar.dismiss();

        this.snackbar.open(`Check complete, You'll be notified if an update exists...`, 'OK', { duration: 2000 });
      })
      .catch(() => {
        updateCheckSnackbar.dismiss();

        this.snackbar.open(`Check could not complete, try again later`, 'OK', { duration: 2000 });
      });
  }

  checkConnectionStatus(): Observable<boolean> {
    return observableMerge(
      observableOf(navigator.onLine),
      observableFromEvent(window, 'online').pipe(mapTo(true)),
      observableFromEvent(window, 'offline').pipe(mapTo(false))
    );
  }
}
