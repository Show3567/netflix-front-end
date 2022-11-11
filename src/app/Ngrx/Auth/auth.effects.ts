import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { AuthDto } from 'src/app/services/interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { AppUserAuth } from 'src/app/services/interfaces/user-auth.interface';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';

@Injectable()
export class AuthEffects {
  private jwtHelper = new JwtHelperService();

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendLoginRequest),
      exhaustMap((appUser: AppUser) => {
        return this.http
          .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
          .pipe(
            map(({ accessToken, role }: AuthDto) => {
              const user: AppUserAuth = this.setUserValueByToken({
                accessToken,
                role,
              });
              this.router.navigate(['/movies']);
              return user;
            }),
            map((appUser: AppUserAuth) => AuthActions.LoginSuccess(appUser)),
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
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}

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
    return user;
  };
}
