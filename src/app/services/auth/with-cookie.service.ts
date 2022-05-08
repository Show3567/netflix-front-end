import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTHSERVER } from 'src/app/app.module';
import { AppUserAuth } from '../interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class WithCookieService {
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

  login(username: string, password: string) {
    return this.http
      .post<any>(
        `${this.authServerPath}/auth/signin`,
        { username, password },
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

  logout() {
    this.http
      .post<any>(
        `${this.authServerPath}/auth/revoke-token`,
        {},
        { withCredentials: true }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject$.next({});
    // this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${this.authServerPath}/auth/refresh-token`,
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

  // helper methods;
  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    if (this.userValue && this.userValue.jwtToken) {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(
        () => this.refreshToken().subscribe(),
        timeout
      );
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
