import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthData } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  internalLoginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.internalLogin),
      exhaustMap(() => {
        const localAuthData = this.authService.getLocalAuth();

        if (localAuthData) {
          const { refreshToken } = localAuthData;

          if (!refreshToken) {
            return of(AuthActions.internalLoginError());
          }

          return this.authService.refreshToken(refreshToken).pipe(
            map((response) => {
              const authData = {
                ...response,
                refreshToken,
              } as AuthData;

              return AuthActions.loggedIn({
                authData,
              });
            })
          );
        }

        return of(AuthActions.internalLoginError());
      })
    )
  );

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
        const { refreshToken } = this.authService.getLocalAuth()!;
        this.authService.clearLocalAuth();

        return this.authService.logout(refreshToken).pipe(
          map(() => AuthActions.loggedOut()),
          catchError(() => {
            return of(AuthActions.loggedOut());
          })
        );
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
