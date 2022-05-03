import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUserAuth, UserRole } from './interfaces/user-auth.interface';
import { AppUser } from './interfaces/user-login.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseAuth = 'http://localhost:4231/auth';
  private readonly httpOptions = {
    // check the whole response
    observe: 'response' as 'body',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private securityObject: AppUserAuth = new AppUserAuth();

  set securityObj(userAuth: AppUserAuth) {
    this.securityObject = userAuth;
  }

  get securityObj() {
    return this.securityObject;
  }

  constructor(private readonly http: HttpClient) {}

  signIn(entity: AppUser) {
    this.resetSecurityObject();

    return this.http
      .post<AppUserAuth>(
        [this.baseAuth, 'signin'].join('/'),
        entity,
        this.httpOptions
      )
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  private resetSecurityObject(): void {
    this.securityObject.username = '';
    this.securityObject.email = '';
    this.securityObject.role = UserRole.USER;
    this.securityObject.tmdb_key = '';
    // this.securityObject = {
    //     username: '',
    //     email: '',
    //     role: UserRole.USER,
    //     tmdb_key: ''
    // }
    localStorage.removeItem('bearerToken');
  }
}
