import { createReducer, on } from '@ngrx/store';
import {
  internalLogin,
  internalLoginError,
  internalLoginSuccess,
  loggedIn,
  loggedOut,
  login,
  logout,
} from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isProcessing: boolean;
}

export const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  isProcessing: true,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(internalLogin, (state) => ({
    ...state,
    isLoggedIn: false,
    isProcessing: false,
  })),
  on(internalLoginSuccess, (state, { authData }) => ({
    ...state,
    ...authData,
    isLoggedIn: true,
  })),
  on(internalLoginError, (state) => ({
    ...state,
    isLoggedIn: false,
    isProcessing: false,
  })),
  on(login, (state) => ({
    ...state,
  })),
  on(loggedIn, (state) => ({
    ...state,
  })),
  on(logout, (state) => ({
    ...state,
  })),
  on(loggedOut, (state) => ({
    ...state,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
  }))
);
