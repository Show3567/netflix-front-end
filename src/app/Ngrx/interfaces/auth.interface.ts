import { AppUserAuth } from 'src/app/services/interfaces/user-auth.interface';
import { UserInfo } from 'src/app/services/interfaces/user-signup.interface';

export interface AuthState {
  userRegisterInfo: UserInfo;
  authInfo: AppUserAuth;
  authErr: string;
}
