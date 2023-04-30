import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { appInitializer } from './app.initializer';
import { AuthWithLocalInterceptor } from './interceptors/auth-with-local.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthNgrxService } from '../Ngrx/Auth/auth-ngrx.service';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ injection token
export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const ProdTitle = new InjectionToken<string>('');
export const ApplyTmdbApiKey = new InjectionToken<string>('');

export const TMDBBASEURL = new InjectionToken<string>('');
export const MOVIEIMGBASEURL = new InjectionToken<string>('');

@NgModule({
  declarations: [],
  exports: [LoggerModule],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reuse values
        {
          provide: AUTHSERVER,
          useValue: 'http://localhost:4231',
        },
        {
          provide: TMDBBASEURL,
          useValue: 'https://api.themoviedb.org/3',
        },
        {
          provide: MOVIEIMGBASEURL,
          useValue: 'https://image.tmdb.org/t/p',
        },
        {
          provide: ApplyTmdbApiKey,
          useValue:
            'https://developers.themoviedb.org/3/getting-started/authentication',
        },
        {
          provide: ProdTitle,
          useValue: 'Notflix',
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Angular initializer;
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializer,
          multi: true,
          deps: [AuthNgrxService],
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
