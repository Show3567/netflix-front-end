import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../interfaces/auth.interface';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const getUserAuth = createSelector(
  selectAuth,
  (state: AuthState) => state.authInfo
);
export const getUserRegisterInfo = createSelector(
  selectAuth,
  (state: AuthState) => state.userRegisterInfo
);
