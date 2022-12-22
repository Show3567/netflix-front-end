import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AUTHSERVER } from 'src/app/core/core.module';
import { AppUserAuthCookie } from '../interfaces/user-auth-c.interface';
import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class WithCookieService {
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

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
  sighup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role, tmdb_key } = this.appUserRegister;

    if (!username || !password || !email || !role || !tmdb_key)
      return of('Register failed');

    return this.http
      .post<AuthDto>(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<AppUserAuthCookie>(
        `${this.authServerPath}/auth-c/signin`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        map((user: AppUserAuthCookie) => {
          this.userSubject$.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    this.http
      .post<any>(
        `${this.authServerPath}/auth-c/revoke-token`,
        {},
        { withCredentials: true }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject$.next({});
    this.router.navigate(['/home']);
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${this.authServerPath}/auth-c/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.userSubject$.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  //* helper methods;
  private startRefreshTokenTimer() {
    if (this.userValue) {
      // & maybe chech cookie expire time !!!!
      this.refreshTokenTimeout = setTimeout(
        () => this.refreshToken().subscribe(),
        0
        // timeout
      );
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
