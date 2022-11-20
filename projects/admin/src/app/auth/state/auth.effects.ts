import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthResponse } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) => {
        const { authRequest } = action;
        return this.authService.login({ ...authRequest }).pipe(
          map((authResponse: AuthResponse) =>
            AuthActions.loggedIn({
              authResponse,
            })
          ),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(AuthActions.loginError({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
