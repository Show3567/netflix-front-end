import { createReducer, on } from '@ngrx/store';

import { AppUserAuth } from 'src/app/services/interfaces/user-auth.interface';
import { UserInfo } from 'src/app/services/interfaces/user-signup.interface';
import { AuthState } from '../interfaces/auth.interface';

import * as AuthActions from './auth.actions';

const initialState: AuthState = {
  userRegisterInfo: {},
  authInfo: {},
  authErr: '',
};

export const AuthReducer = createReducer(
  initialState,
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update AuthInfo
  on(AuthActions.UpdateAuthInfoSuccess, (state, authInfo: AppUserAuth) => {
    return { ...state, authInfo };
  }),
  on(AuthActions.UpdateAuthInfoFailed, (state, { authErr }) => {
    return { ...state, authErr };
  }),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignUp
  on(AuthActions.AddUserInfo, (state, userInfo: UserInfo) => {
    return {
      ...state,
      userRegisterInfo: {
        ...state.userRegisterInfo,
        ...userInfo,
      },
    };
  }),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignOut
  on(AuthActions.SignOut, (state) => {
    return { ...initialState };
  })
);
