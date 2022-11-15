import { createReducer, on } from '@ngrx/store';
import * as PositionActions from './scroll.action';

const initalState = {
  positionState: {},
};

export const PositionReducer = createReducer(
  initalState,
  on(PositionActions.RecordScrollPosition, (state) => {
    return state;
  })
);
