import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PositionState } from '../interfaces/position.interface';

const selectPosition = createFeatureSelector<PositionState>('positionRecord');

export const selectScrollPosition = createSelector(
  selectPosition,
  (state: PositionState) => state.positionState
);
