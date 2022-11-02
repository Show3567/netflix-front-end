import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TmdbService } from '../services/tmdb/tmdb.service';
import { WithCookieService } from '../services/auth/with-cookie.service';
import { AuthService } from '../services/auth/auth.service';
import { Title } from '@angular/platform-browser';

//* injection token */
export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const ProdTitle = new InjectionToken<string>('');
export const USECOOKIE = new InjectionToken<string>('');

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
        {
          provide: Title,
          useClass: Title,
        },
        {
          provide: AUTHSERVER,
          useValue: 'http://localhost:4231',
        },
        {
          provide: ProdTitle,
          useValue: 'Notflix',
        },
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

        // {
        //   provide: TMDBAPIKEY,
        //   useValue: 'ac7e1f44cec0dd6e260391374208b0cc',
        // },
      ],
    };
  }
}
