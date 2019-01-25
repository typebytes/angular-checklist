import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

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
}
