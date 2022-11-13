import { createAction, props } from '@ngrx/store';

import {
  AppUserAuth,
  UserRole,
} from 'src/app/services/interfaces/user-auth.interface';
import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { UserInfo } from 'src/app/services/interfaces/user-signup.interface';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update AuthInfo
export const UpdateAuthInfoSuccess = createAction(
  '[ Auth ] Login Success',
  props<AppUserAuth>()
);
export const UpdateAuthInfoFailed = createAction(
  '[ Auth ] Login Failed',
  props<{ authErr: string }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignIn
export const SendLoginRequest = createAction(
  '[ Auth ] Send Login Request',
  props<AppUser>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignUp
export const AddUserInfo = createAction(
  '[ Auth ] Add User Register info',
  props<UserInfo>()
);
export const SendSignUpRequest = createAction(
  '[ Auth ] Send SignUp Request',
  props<{ role: UserRole }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignOut
export const TriggerSignOut = createAction('[ Auth ] Trigger SignOut');
export const SignOut = createAction('[ Auth ] SignOut to Remove userInfo');

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Upgrade Permission
export const SendUpdateUserInfoRequest = createAction(
  '[ Auth ] Send UpdateUserInfo Request',
  props<{ role: UserRole }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Refresh Token
export const SendRefreshTokenRequest = createAction(
  '[ Auth ] Send RefreshToken Request'
);
