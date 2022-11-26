import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthRequest, AuthData } from '../../core/models/auth.model';
import { Features } from '../../shared/consts/features.consts';

export const AuthActions = {
  InternalLogin: `[${Features.Auth}] Internal Login`,
  InternalLoginError: `[${Features.Auth}] Internal Login Error`,
  Login: `[${Features.Auth}] Login`,
  LoggedIn: `[${Features.Auth}] Logged In`,
  loggedInRedirect: `[${Features.Auth}] Logged In Redirect`,
  LoginError: `[${Features.Auth}] Login Error`,
  Logout: `[${Features.Auth}] Logout`,
  LoggedOut: `[${Features.Auth}] Logged Out`,
};

export const internalLogin = createAction(AuthActions.InternalLogin);
export const internalLoginError = createAction(AuthActions.InternalLoginError);

export const login = createAction(
  AuthActions.Login,
  props<{ authRequest: AuthRequest }>()
);

export const loggedIn = createAction(
  AuthActions.LoggedIn,
  props<{ authData: AuthData }>()
);

export const loggedInRedirect = createAction(AuthActions.LoggedIn);

export const loginError = createAction(
  AuthActions.LoginError,
  props<{ error: HttpErrorResponse }>()
);

export const logout = createAction(AuthActions.Logout);

export const loggedOut = createAction(AuthActions.LoggedOut);

