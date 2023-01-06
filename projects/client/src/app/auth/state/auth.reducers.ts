import { createReducer, on } from '@ngrx/store';
import { loggedIn, loggedOut, login, logout } from './auth.actions';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState = {
  accessToken: null,
  refreshToken: null,
};

export const authReducer = createReducer<AuthState>(
  initialState,
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
  }))
);
