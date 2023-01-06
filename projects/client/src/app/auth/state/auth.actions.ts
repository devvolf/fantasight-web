import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  AuthRequest,
  AuthData,
  RegisterRequest,
  ChangePasswordRequest,
} from '../../core/models/auth.model';
import { Features } from '../../shared/consts/features.consts';

export const AuthActions = {
  Login: `[${Features.Auth}] Login`,
  LoggedIn: `[${Features.Auth}] Logged In`,
  LoginError: `[${Features.Auth}] Login Error`,
  Register: `[${Features.Auth}] Register`,
  RegisterSuccess: `[${Features.Auth}] Register Success`,
  RegisterError: `[${Features.Auth}] Register Error`,
  Logout: `[${Features.Auth}] Logout`,
  LoggedOut: `[${Features.Auth}] Logged Out`,
  ChangePassword: `[${Features.Auth}] Change Password`,
  ChangePasswordSuccess: `[${Features.Auth}] Change Password Success`,
  ChangePasswordError: `[${Features.Auth}] Change Password Error`,
};

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

export const register = createAction(
  AuthActions.Register,
  props<{ request: RegisterRequest }>()
);

export const registerSuccess = createAction(
  AuthActions.RegisterSuccess,
  props<{ authRequest: AuthRequest }>()
);

export const registerError = createAction(
  AuthActions.RegisterError,
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
