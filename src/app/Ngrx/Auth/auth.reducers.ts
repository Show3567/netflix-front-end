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
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignIn
  on(AuthActions.LoginSuccess, (state, authInfo: AppUserAuth) => {
    return { ...state, authInfo };
  }),
  on(AuthActions.LoginFailed, (state, { authErr }) => {
    return { ...state, authErr };
  }),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignOut
  on(AuthActions.SignOut, (state) => {
    return { ...initialState };
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
  on(AuthActions.SignUpSuccess, (state, authInfo: AppUserAuth) => {
    return { ...state, authInfo };
  }), //& reuse loginsuccess logic ?
  on(AuthActions.SignUpFailed, (state, { authErr }) => {
    return { ...state, authErr };
  }), //& reuse loginfailed logic ?
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Upgrade Permission
  on(AuthActions.UpdateUserInfoSuccess, (state, authInfo: AppUserAuth) => {
    return { ...state, authInfo };
  }), //& reuse loginsuccess logic ?
  on(AuthActions.UpdateUserInfoFailed, (state, { authErr }) => {
    return { ...state, authErr };
  }) //& reuse loginfailed logic ?
);
