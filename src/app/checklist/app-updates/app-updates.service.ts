import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import {
  fromEvent as observableFromEvent,
  interval,
  merge as observableMerge,
  Observable,
  of as observableOf
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {
  constructor(public snackbar: MatSnackBar, private serviceWorkerUpdates: SwUpdate) {}

  checkUpdatesAuto() {
    this.serviceWorkerUpdates.activated.subscribe(() => {
      this.snackbar.open('App updated', 'OK', { duration: 2000 });
    });

    this.serviceWorkerUpdates.available.subscribe(() => {
      const updateSnackbar = this.snackbar.open('Update available!', 'Update Now', {
        duration: 2000
      });

      updateSnackbar.onAction().subscribe(() => {
        updateSnackbar.dismiss();
        window.location.reload();
      });
    });
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
