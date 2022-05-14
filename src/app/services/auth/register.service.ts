import { Injectable } from '@angular/core';
import { UserRole } from '../interfaces/user-auth.interface';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  appUserRegister = new AppUserRegister();

  constructor() {}

  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }

  addRole(userRole: { role: UserRole }) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    console.log(this.appUserRegister);
  }
}
