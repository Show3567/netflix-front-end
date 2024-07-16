import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { AppUser } from '../interfaces/user-login.interface';
import { TmdbService } from '../tmdb/tmdb.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';
import { AuthDto } from '../interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  userSignal = signal<AppUserAuth>({});

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  private isBrowser!: boolean;
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmdbService,
    @Inject(AUTHSERVER) public readonly authServerPath: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platform);
  }

  /* SignIn */
  login(appUser: AppUser): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign in!', error);
        }),
      );
  }

  /* SignOut */
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      this.stopRefreshTokenTimer();

      this.userSignal.set({});
      this.router.navigate(['/home']);
    }
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }
  signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role } = this.appUserRegister;

    if (!username || !password || !email || !role) return of('Register failed');

    return this.http
      .post<AuthDto>(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister,
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        }),
      );
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }): Observable<AuthDto> {
    this.stopRefreshTokenTimer();

    return this.http
      .patch<AuthDto>(
        [this.authServerPath, 'auth', 'userupdate'].join('/'),
        userRole,
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        }),
      );
  }

  //* helper methods;
  refreshToken(): Observable<AuthDto | string> {
    let token;
    if (this.isBrowser) {
      token = localStorage.getItem('access_token');
    }
    if (!token) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http
      .get<AuthDto>(`${this.authServerPath}/auth/refresh-token`, { headers })
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
        }),
      );
  }
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userSignal().jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    if (this.isBrowser) {
      localStorage.setItem('access_token', accessToken);
    }

    const { id, username, email, exp } =
      this.jwtHelper.decodeToken(accessToken);

    const user = {
      ...{ id, username, email, role },
      jwtToken: accessToken,
    };
    this.userSignal.set(user);
    this.startRefreshTokenTimer(exp);
  };
}
