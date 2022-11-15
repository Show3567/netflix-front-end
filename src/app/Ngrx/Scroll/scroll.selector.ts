import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectPosition = createFeatureSelector('positionRecord');

export const selectScrollPosition = createSelector(
  selectPosition,
  (state: any) => state.positionState
);
