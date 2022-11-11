import { createAction, props } from '@ngrx/store';

import { AuthDto } from 'src/app/services/interfaces/authDto.interface';
import {
  AppUserAuth,
  UserRole,
} from 'src/app/services/interfaces/user-auth.interface';
import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { UserInfo } from 'src/app/services/interfaces/user-signup.interface';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignIn
export const SendLoginRequest = createAction(
  '[Auth] Send Login Request',
  props<AppUser>()
);
export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<AppUserAuth>()
);
export const LoginFailed = createAction(
  '[Auth] Login Failed',
  props<{ authErr: string }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignUp
export const AddUserInfo = createAction(
  '[Auth] Add User Register info',
  props<UserInfo>()
);

export const SendSignUpRequest = createAction(
  '[Auth] Send SignUp Request',
  props<{ role: UserRole }>()
);
export const SignUpSuccess = createAction(
  '[Auth] SignUp Success',
  props<AppUserAuth>()
);
export const SignUpFailed = createAction(
  '[Auth] SignUp Failed',
  props<{ authErr: string }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignOut
export const SignOut = createAction('[Auth] SignOut to Remove userInfo');

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Upgrade Permission
export const SendUpdateUserInfoRequest = createAction(
  '[Auth] Send UpdateUserInfo Request',
  props<{ role: UserRole }>()
);
export const UpdateUserInfoSuccess = createAction(
  '[Auth] UpdateUserInfo Success',
  props<AppUserAuth>()
);
export const UpdateUserInfoFailed = createAction(
  '[Auth] UpdateUserInfo Failed',
  props<{ authErr: string }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Refresh Token
export const SendRefreshTokenRequest = createAction(
  '[Auth] Send RefreshToken Request'
);
export const RefreshTokenSuccess = createAction(
  '[Auth] RefreshToken Success',
  props<AppUserAuth>()
);
export const RefreshTokenFailed = createAction(
  '[Auth] RefreshToken Failed',
  props<{ authErr: string }>()
);
