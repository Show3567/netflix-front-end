import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthDto } from 'src/app/services/interfaces/authDto.interface';

const initialState = {
  userInfo: {},
  authInfo: {},
  authErr: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.LoginSuccess, (state, appUser: AuthDto) => {
    return {
      ...state,
    };
  }),
  on(AuthActions.LoginFailed, (state) => {
    return state;
  })
);
