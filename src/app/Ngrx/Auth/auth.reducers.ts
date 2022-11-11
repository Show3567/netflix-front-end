import { createReducer, on } from '@ngrx/store';

import { AppUserAuth } from 'src/app/services/interfaces/user-auth.interface';
import * as AuthActions from './auth.actions';

const initialState = {
  userInfo: {},
  authInfo: {},
  authErr: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.LoginSuccess, (state, authInfo: AppUserAuth) => {
    return { ...state, authInfo };
  }),
  on(AuthActions.LoginFailed, (state) => {
    return state;
  })
);
