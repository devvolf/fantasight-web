import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../shared/consts/features.consts';
import { AuthState } from './auth.reducers';

const getAuthState = createFeatureSelector<AuthState>(Features.Auth);

export const token = createSelector(
  getAuthState,
  (state: AuthState) => state.accessToken
);
