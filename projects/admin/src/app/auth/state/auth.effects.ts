import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthData } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        const { authRequest } = action;
        return this.authService.login({ ...authRequest }).pipe(
          map((authData: AuthData) => {
            this.authService.saveLocalAuth(authData);

            return AuthActions.loggedIn({
              authData,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(AuthActions.loginError({ error }));
          })
        );
      })
    )
  );

  loggedInEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loggedIn),
        tap(() => {
          this.router.navigateByUrl('main');
        })
      ),
    { dispatch: false }
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => {
        const authData = this.authService.getLocalAuth();
        if (authData) {
          const { refreshToken } = authData;

          this.authService.clearLocalAuth();

          return this.authService.logout(refreshToken).pipe(
            map(() => AuthActions.loggedOut()),
            catchError(() => {
              return of(AuthActions.loggedOut());
            })
          );
        }

        this.authService.clearLocalAuth();
        return of(AuthActions.loggedOut());
      })
    )
  );

  loggedOutEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loggedOut),
        tap(() => {
          this.router.navigateByUrl('auth');
        })
      ),
    { dispatch: false }
  );

  changePasswordEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      exhaustMap((action) => {
        const { request } = action;

        return this.authService.changePassword(request).pipe(
          map((response) => {
            this.snackbarService.success('Successfully changed password');
            return AuthActions.logout();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(AuthActions.changePasswordError({ error }));
          })
        );
      })
    )
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginError, AuthActions.changePasswordError),
        tap((action) => {
          const { error } = action;
          this.snackbarService.error(error.error.message || error.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
