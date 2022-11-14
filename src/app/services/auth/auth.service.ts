import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { AppUser } from '../interfaces/user-login.interface';
import { TmdbService } from '../tmdb/tmdb.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';
import { AuthDto } from '../interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private userSubject$!: BehaviorSubject<AppUserAuth>;
  user$!: Observable<AppUserAuth>;

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }
  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmdbNgrxService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
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
        })
      );
  }

  /* SignOut */
  logout() {
    localStorage.removeItem('access_token');
    this.tmdbService.setMyApiKey = '';

    this.stopRefreshTokenTimer();

    this.userSubject$.next({});
    this.router.navigate(['/home']);
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

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }): Observable<AuthDto> {
    console.log('Change permission class to: ', userRole.role);
    this.stopRefreshTokenTimer();

    return this.http
      .patch<AuthDto>(
        [this.authServerPath, 'auth', 'userupdate'].join('/'),
        userRole
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

  //* helper methods;
  refreshToken(): Observable<AuthDto | string> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }

    const { id, username, email, tmdb_key } =
      this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, tmdb_key };

    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/refresh-token`, user)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
        })
      );
  }
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userValue.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    this.tmdbService.setMyApiKey = tmdb_key;

    const user = {
      ...{ id, username, email, role, tmdb_key },
      jwtToken: accessToken,
    };
    this.userSubject$.next(user);
    this.startRefreshTokenTimer(exp);
  };
}
