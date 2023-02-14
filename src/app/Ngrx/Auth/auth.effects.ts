import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, take } from 'rxjs/operators';

import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { AuthDto } from 'src/app/services/interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import {
  AppUserAuth,
  UserRole,
} from 'src/app/services/interfaces/user-auth.interface';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';
import { TmdbNgrxService } from '../Tmdb/tmdb-ngrx.service';

@Injectable()
export class AuthEffects {
  private jwtHelper = new JwtHelperService();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signIn effect
  private login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendLoginRequest),
      exhaustMap(({ email, password }: AppUser) => {
        return this.http
          .post<AuthDto>(`${this.authServerPath}/auth/signin`, {
            email,
            password,
          })
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.UpdateAuthInfoSuccess(user);
            }),
            catchError((error: any) =>
              of(
                AuthActions.UpdateAuthInfoFailed({
                  authErr: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signUp effect
  private signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendSignUpRequest),
      switchMap(({ role }: { role: UserRole }) => {
        return this.store.select(AuthSelectors.getUserRegisterInfo).pipe(
          map(({ email, password, tmdb_key, username }) => {
            return { email, password, tmdb_key, username, role };
          })
        );
      }),
      exhaustMap((appUserRegister) => {
        return this.http
          .post<AuthDto>(`${this.authServerPath}/auth/signup`, appUserRegister)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.UpdateAuthInfoSuccess(user);
            }),
            catchError((error: any) =>
              of(
                AuthActions.UpdateAuthInfoFailed({
                  authErr: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UpdateUserInfo effect
  private updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendUpdateUserInfoRequest),
      exhaustMap((userRole: { role: UserRole }) => {
        this.stopRefreshTokenTimer();
        console.log('hello~~~~');
        return this.http
          .patch<AuthDto>(`${this.authServerPath}/auth/userupdate`, userRole)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.UpdateAuthInfoSuccess(user);
            }),
            catchError((error: any) =>
              of(
                AuthActions.UpdateAuthInfoFailed({
                  authErr: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RefreshToken effect
  private refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendRefreshTokenRequest),
      exhaustMap((_) => {
        const currentToken = localStorage.getItem('access_token');

        if (!currentToken) {
          this.router.navigate(['/']);
          return of(
            AuthActions.UpdateAuthInfoFailed({ authErr: JSON.stringify('err') })
          );
        }

        const { id, username, email, tmdb_key } =
          this.jwtHelper.decodeToken(currentToken);
        const user = { id, username, email, tmdb_key };

        // console.log(user, `${this.authServerPath}/auth/refresh-token`);

        return this.http
          .post<AuthDto>(`${this.authServerPath}/auth/refresh-token`, user)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.UpdateAuthInfoSuccess(user);
            }),
            catchError((error: any) =>
              of(
                AuthActions.UpdateAuthInfoFailed({
                  authErr: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SignOut effect
  private signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.TriggerSignOut),
      exhaustMap((_) => {
        localStorage.removeItem('access_token');
        this.tmdbService.setMyApiKey = '';

        this.stopRefreshTokenTimer();
        this.router.navigate(['/home']);

        return of(AuthActions.SignOut());
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly tmdbService: TmdbNgrxService,
    private readonly router: Router,
    private readonly store: Store,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}

  //&  ~~~~~~~~~~~~~~~~~~~~ reuseable code in for signin, signup, refresh, update */
  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({
    accessToken,
    role,
  }: AuthDto): AppUserAuth => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    this.tmdbService.setMyApiKey = tmdb_key;

    const user: AppUserAuth = {
      ...{ id, username, email, role, tmdb_key },
      jwtToken: accessToken,
    };

    this.startRefreshTokenTimer(exp);
    return user;
  };

  //& ~~~~~~~~~~~~~~~~~~~~ timer helper ~~~~~
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      const userAuthInfo = this.getCurValFromObs(
        this.store.select(AuthSelectors.getUserAuth)
      );
      if (userAuthInfo.jwtToken) {
        this.store.dispatch(AuthActions.SendRefreshTokenRequest());
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  private getCurValFromObs(obs: Observable<any>): any {
    let value: any;
    obs.pipe(take(1)).subscribe((val) => {
      value = val;
    });
    return value;
  }
}
