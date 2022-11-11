import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { AppUser } from 'src/app/services/interfaces/user-login.interface';
import { AuthDto } from 'src/app/services/interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SendLoginRequest),
      exhaustMap((appUser: AppUser) => {
        return this.http
          .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
          .pipe(
            map((appUser: AuthDto) => AuthActions.LoginSuccess(appUser)),
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
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}
}
