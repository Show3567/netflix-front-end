import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUserAuth } from '../interfaces/user-auth.interface';
import { AppUser } from '../interfaces/user-login.interface';

@Injectable()
export class AuthService {
  public user$!: Observable<AppUserAuth>;

  constructor() {}

  login(appUser: AppUser): Observable<{ accessToken: string }> {
    return of({ accessToken: 'string' });
  }
}
