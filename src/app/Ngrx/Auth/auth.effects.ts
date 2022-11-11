import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { AuthDto } from 'src/app/services/interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import {
  AppUserAuth,
  UserRole,
} from 'src/app/services/interfaces/user-auth.interface';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';

@Injectable()
export class AuthEffects {
  private jwtHelper = new JwtHelperService();

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ login effect
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
              return AuthActions.LoginSuccess(user);
            }),
            catchError((error: any) =>
              of(AuthActions.LoginFailed({ authErr: JSON.stringify(error) }))
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
              return AuthActions.SignUpSuccess(user);
            }),
            catchError((error: any) =>
              of(AuthActions.LoginFailed({ authErr: JSON.stringify(error) }))
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
        return this.http
          .patch<AuthDto>(`${this.authServerPath}/auth/userupdate`, userRole)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.SignUpSuccess(user);
            }),
            catchError((error: any) =>
              of(AuthActions.LoginFailed({ authErr: JSON.stringify(error) }))
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
            AuthActions.LoginFailed({ authErr: JSON.stringify('err') })
          );
        }

        const { id, username, email, tmdb_key } =
          this.jwtHelper.decodeToken(currentToken);
        const user = { id, username, email, tmdb_key };

        return this.http
          .patch<AuthDto>(`${this.authServerPath}/auth/refresh-token`, user)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return AuthActions.SignUpSuccess(user);
            }),
            catchError((error: any) =>
              of(AuthActions.LoginFailed({ authErr: JSON.stringify(error) }))
            )
          );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly tmdbService: TmdbService,
    private readonly router: Router,
    private readonly store: Store,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}

  //&  ~~~~~~~~~~~~~~~~~~~~ reuseable code in for signin, signup, refresh, update */
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
    return user;
  };
}
