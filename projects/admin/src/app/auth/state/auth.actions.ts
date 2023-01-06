import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthRequest, AuthData, ChangePasswordRequest } from '../../core/models/auth.model';
import { Features } from '../../shared/consts/features.consts';

export const AuthActions = {
  InternalLogin: `[${Features.Auth}] Internal Login`,
  InternalLoginSuccess: `[${Features.Auth}] Internal Login Success`,
  InternalLoginError: `[${Features.Auth}] Internal Login Error`,
  Login: `[${Features.Auth}] Login`,
  LoggedIn: `[${Features.Auth}] Logged In`,
  LoginError: `[${Features.Auth}] Login Error`,
  Logout: `[${Features.Auth}] Logout`,
  LoggedOut: `[${Features.Auth}] Logged Out`,
  ChangePassword: `[${Features.Auth}] Change Password`,
  ChangePasswordSuccess: `[${Features.Auth}] Change Password Success`,
  ChangePasswordError: `[${Features.Auth}] Change Password Error`,
};

export const internalLogin = createAction(AuthActions.InternalLogin);
export const internalLoginSuccess = createAction(
  AuthActions.InternalLoginSuccess,
  props<{ authData: AuthData }>()
);
export const internalLoginError = createAction(AuthActions.InternalLoginError);

export const login = createAction(
  AuthActions.Login,
  props<{ authRequest: AuthRequest }>()
);

export const loggedIn = createAction(
  AuthActions.LoggedIn,
  props<{ authData: AuthData }>()
);

export const loginError = createAction(
  AuthActions.LoginError,
  props<{ error: HttpErrorResponse }>()
);

export const logout = createAction(AuthActions.Logout);

export const loggedOut = createAction(AuthActions.LoggedOut);

export const changePassword = createAction(
  AuthActions.ChangePassword,
  props<{ request: ChangePasswordRequest }>()
);

export const changePasswordSuccess = createAction(
  AuthActions.ChangePasswordSuccess
);

export const changePasswordError = createAction(
  AuthActions.ChangePasswordError,
  props<{ error: HttpErrorResponse }>()
);
