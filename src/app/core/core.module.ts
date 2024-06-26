import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TmdbService } from '../services/tmdb/tmdb.service';
import { WithCookieService } from '../services/auth/with-cookie.service';
import { AuthService } from '../services/auth/auth.service';
import { appInitializer } from './app.initializer';
import { AuthWithLocalInterceptor } from './interceptors/auth-with-local.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ injection token
export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const ProdTitle = new InjectionToken<string>('');

const USECOOKIE = new InjectionToken<string>('');

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reuse values
        {
          provide: AUTHSERVER,
          useValue: 'http://localhost:5566/api/v1',
        },
        {
          provide: ProdTitle,
          useValue: 'Notflix',
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AuthService selector
        {
          provide: USECOOKIE,
          useValue: false,
        },
        {
          provide: AuthService,
          useFactory: (
            usecookie: boolean,
            router: Router,
            http: HttpClient,
            tmdbservice: TmdbService,
            authpath: string
          ) => {
            return usecookie
              ? new WithCookieService(router, http, authpath)
              : new AuthService(router, http, tmdbservice, authpath);
          },
          deps: [USECOOKIE, Router, HttpClient, TmdbService, AUTHSERVER],
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Angular initializer;
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializer,
          multi: true,
          deps: [AuthService],
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interceptors;
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthWithLocalInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page Title control
        Title,
      ],
    };
  }
}

// {
//   provide: TMDBAPIKEY,
//   useValue: 'ac7e1f44cec0dd6e260391374208b0cc',
// },
