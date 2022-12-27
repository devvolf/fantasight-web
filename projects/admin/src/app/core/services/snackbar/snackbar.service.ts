import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DURATION = 3000;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  success(message: string): void {
    this.snackbar.open(message, 'Ok', { duration: DURATION });
  }

  error(message: string): void {
    this.snackbar.open(message, 'Ok', { duration: DURATION });
  }
}
