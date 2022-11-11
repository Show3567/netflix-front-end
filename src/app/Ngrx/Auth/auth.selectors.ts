import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuth = createFeatureSelector('auth');

export const getUserAuth = createSelector(
  selectAuth,
  (state: any) => state.authInfo
);
