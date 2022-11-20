import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthRequest, AuthResponse } from '../../core/models/auth.model';
import { Features } from '../../shared/consts/features.consts';

export const AuthActions = {
  Login: `[${Features.Auth}] Login`,
  LoggedIn: `[${Features.Auth}] Logged in`,
  LoginError: `[${Features.Auth}] Login error`,
};

export const login = createAction(
  AuthActions.Login,
  props<{ authRequest: AuthRequest }>()
);

export const loggedIn = createAction(
  AuthActions.LoggedIn,
  props<{ authResponse: AuthResponse }>()
);

export const loginError = createAction(
  AuthActions.LoginError,
  props<{ error: HttpErrorResponse }>()
);
