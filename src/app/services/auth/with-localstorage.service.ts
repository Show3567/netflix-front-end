import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AUTHSERVER } from 'src/app/app.module';
import { AppUserAuth } from '../interfaces/user-auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUser } from '../interfaces/user-login.interface';

@Injectable({
  providedIn: 'root',
})
export class WithLocalstorageService {
  private jwtHelper = new JwtHelperService();
  private userSubject$!: BehaviorSubject<AppUserAuth>;
  public user$!: Observable<AppUserAuth>;

  public get userValue(): AppUserAuth {
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

          const user = {
            ...{ id, username, email, role, tmdb_key },
            jwtToken: accessToken,
          };
          this.userSubject$.next(user);
          this.startRefreshTokenTimer(exp);
        })
      );
  }

  refreshToken(user: AppUserAuth) {
    return this.http
      .post<any>(`${this.authServerPath}/auth/refresh-token`, user)
      .pipe
      // map((user) => {
      //   console.log(user);
      //   //   this.userSubject$.next(user);
      //   //   this.startRefreshTokenTimer();
      //   return user;
      // })
      ();
  }

  // helper methods;
  private refreshTokenTimeout: any;

  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();
    const { id, username, email, role, tmdb_key } = this.userValue;

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userValue.jwtToken) {
        this.refreshToken({ id, username, email, role, tmdb_key }).subscribe();
      }
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
