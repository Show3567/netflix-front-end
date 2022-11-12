import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserRole } from '../../services/interfaces/user-auth.interface';
import { AppUser } from '../../services/interfaces/user-login.interface';
import { UserInfo } from '../../services/interfaces/user-signup.interface';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthNgrxService {
  constructor(private readonly store: Store) {}

  /* SignIn */
  login(appUser: AppUser): void {
    this.store.dispatch(AuthActions.SendLoginRequest(appUser));
  }

  /* SignOut */
  logout() {
    this.store.dispatch(AuthActions.TriggerSignOut());
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo): void {
    this.store.dispatch(AuthActions.AddUserInfo(userInfo));
  }
  sighup(userRole: { role: UserRole }): void {
    this.store.dispatch(AuthActions.SendSignUpRequest(userRole));
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }): void {
    console.log('Change permission class to: ', userRole.role);

    this.store.dispatch(AuthActions.SendUpdateUserInfoRequest(userRole));
  }

  /* refreshToken */
  refreshToken(): void {
    this.store.dispatch(AuthActions.SendRefreshTokenRequest());
  }
}
