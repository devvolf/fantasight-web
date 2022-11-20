import { createReducer, on } from '@ngrx/store';
import { loggedIn, login } from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
  })),
  on(loggedIn, (state, { authResponse }) => ({
    ...state,
    ...authResponse,
    isLoggedIn: true,
  }))
);
