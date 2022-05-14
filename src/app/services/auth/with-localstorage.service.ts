import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTHSERVER } from 'src/app/app.module';
import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUser } from '../interfaces/user-login.interface';
import { TmdbService } from '../tmdb.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';

@Injectable({
  providedIn: 'root',
})
export class WithLocalstorageService {
  private jwtHelper = new JwtHelperService();
  private userSubject$!: BehaviorSubject<AppUserAuth>;
  public user$!: Observable<AppUserAuth>;

  private appUserRegister = new AppUserRegister();

  public get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }
  public get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmdbService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
  }

  /* SignIn */
  login(appUser: AppUser): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.authServerPath}/auth/signin`,
        appUser
      )
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          localStorage.setItem('access_token', accessToken);
          const { id, username, email, role, tmdb_key, exp } =
            this.jwtHelper.decodeToken(accessToken);

          this.tmdbService.setMyApiKey = tmdb_key;

          const user = {
            ...{ id, username, email, role, tmdb_key },
            jwtToken: accessToken,
          };

          this.userSubject$.next(user);
          this.startRefreshTokenTimer(exp);

          this.router.navigate(['/movies']);
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

  addRole(userRole: { role: UserRole }) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role, tmdb_key } = this.appUserRegister;
    if (username && password && email && role && tmdb_key) {
      this.http.post(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister
      );
    }
  }

  // helper methods;
  private refreshTokenTimeout: any;

  refreshToken(): Observable<any> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/login']);
      return of('err');
    }

    const { id, username, email, role, tmdb_key } =
      this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, role, tmdb_key };

    return this.http
      .post<any>(`${this.authServerPath}/auth/refresh-token`, user)
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          localStorage.setItem('access_token', accessToken);
          const { id, username, email, role, tmdb_key, exp } =
            this.jwtHelper.decodeToken(accessToken);

          this.tmdbService.setMyApiKey = tmdb_key;

          const user = {
            ...{ id, username, email, role, tmdb_key },
            jwtToken: accessToken,
          };
          this.userSubject$.next(user);
          this.startRefreshTokenTimer(exp);
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
  //   private setUserValueByToken({ accessToken }: { accessToken: string }) {
  //     localStorage.setItem('access_token', accessToken);
  //     const { id, username, email, role, tmdb_key, exp } =
  //       this.jwtHelper.decodeToken(accessToken);

  //     const user = {
  //       ...{ id, username, email, role, tmdb_key },
  //       jwtToken: accessToken,
  //     };
  //     this.userSubject$.next(user);
  //     this.startRefreshTokenTimer(exp);
  //   }
}
