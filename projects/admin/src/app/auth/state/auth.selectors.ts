import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../shared/consts/features.consts';
import { AuthState } from './auth.reducers';

const getAuthState = createFeatureSelector<AuthState>(Features.Auth);

export const isProcessing = createSelector(
  getAuthState,
  (state: AuthState) => state.isProcessing
);

export const isLoggedIn = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoggedIn
);
