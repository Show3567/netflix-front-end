import { createReducer } from '@ngrx/store';

const initialState = {
  authInfo: {},
  authErr: '',
};

export const AuthReducer = createReducer(initialState);
