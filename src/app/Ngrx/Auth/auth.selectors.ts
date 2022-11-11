import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector('auth');

export const getUserAuth = createSelector(
  selectAuth,
  (state: any) => state.authInfo
);
export const getUserRegisterInfo = createSelector(
  selectAuth,
  (state: any) => state.userRegisterInfo
);
