import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { AppUserAuthCookie } from '../interfaces/user-auth-c.interface';

@Injectable()
export class AuthService {
  private appUserRegister = new AppUserRegister();

  private userSubject$!: BehaviorSubject<AppUserAuth>;
  user$!: Observable<AppUserAuth>;

  get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }
  sighup(userRole: { role: UserRole }): Observable<AppUserAuthCookie | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role, tmdb_key } = this.appUserRegister;

    if (!username || !password || !email || !role || !tmdb_key)
      return of('Register failed');

    return this.http
      .post<AppUserAuthCookie>(
        `${this.authServerPath}/auth-c/signup`,
        this.appUserRegister
      )
      .pipe(
        tap((user: AppUserAuthCookie) => {
          this.userSubject$.next(user);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  login(username: string, password: string): Observable<AppUserAuthCookie> {
    return this.http
      .post<AppUserAuthCookie>(
        `${this.authServerPath}/auth-c/signin`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        map((user: AppUserAuthCookie) => {
          this.userSubject$.next(user);
          return user;
        })
      );
  }

  logout() {
    this.http.get(`${this.authServerPath}/auth-c/signout`).subscribe();

    this.userSubject$.next({});
    this.router.navigate(['/home']);
  }

  refreshToken(): Observable<AppUserAuthCookie> {
    return this.http
      .get<AppUserAuthCookie>(`${this.authServerPath}/auth-c/initapp`)
      .pipe(
        tap((user: AppUserAuthCookie) => {
          this.userSubject$.next(user);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }
}
