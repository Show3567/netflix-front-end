import { createReducer, on } from '@ngrx/store';
import { PositionState } from '../interfaces/position.interface';
import * as PositionActions from './scroll.action';

const initalState: PositionState = {
  positionState: {},
};

export const PositionReducer = createReducer(
  initalState,
  on(
    PositionActions.RecordScrollPosition,
    (state, { name, x, y }): PositionState => {
      return {
        positionState: { [name]: [x, y] },
      };
    }
  )
);
