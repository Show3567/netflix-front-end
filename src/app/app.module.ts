import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { WithCookieService } from './services/auth/with-cookie.service';
import { WithLocalstorageService } from './services/auth/with-localstorage.service';
import { AuthWithLocalInterceptor } from './interceptors/auth-with-local.interceptor';
import { TmdbService } from './services/tmdb.service';

export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const USECOOKIE = new InjectionToken<string>('');
export const AuthService = new InjectionToken<string>('');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    { provide: USECOOKIE, useValue: false },
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
          : new WithLocalstorageService(router, http, tmdbservice, authpath);
      },
      deps: [USECOOKIE, Router, HttpClient, TmdbService, AUTHSERVER],
    },
    { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
    { provide: AUTHSERVER, useValue: 'http://localhost:4231' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthWithLocalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
