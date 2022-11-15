import { createReducer, on } from '@ngrx/store';
import * as PositionActions from './scroll.action';

const initalState = {
  positionState: { movies: [0, 0] },
};

export const PositionReducer = createReducer(
  initalState,
  on(PositionActions.RecordScrollPosition, (state, { x, y }) => {
    return {
      positionState: { movies: [x, y] },
    };
  })
);
