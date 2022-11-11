import { createReducer } from '@ngrx/store';

const initialState = {
  userInfo: {},
  authInfo: {},
  authErr: '',
};

export const AuthReducer = createReducer(initialState);
