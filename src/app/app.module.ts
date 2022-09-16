import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
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
import { WithLocalstorageService } from './services/auth/with-localstorage.service';

import { appInitializer } from './core/app.initializer';
import { AuthWithLocalInterceptor } from './core/interceptors/auth-with-local.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MovieComponent } from './pages/movie/movie.component';
import { AuthService } from './services/auth/auth.service';
import { TmdbService } from './services/tmdb/tmdb.service';
import { WithCookieService } from './services/auth/with-cookie.service';

//* injection token */
export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const ProdTitle = new InjectionToken<string>('');
export const CD = new InjectionToken<string>('');

const USECOOKIE = new InjectionToken<string>('');

@NgModule({
  declarations: [AppComponent, MovieComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    // Angular initializer;
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [WithLocalstorageService],
    },
    // authserver path;
    { provide: AUTHSERVER, useValue: 'http://localhost:4231' },
    // Interceptors;
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
    // Title
    Title,
    { provide: ProdTitle, useValue: 'Notflix' },
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
    { provide: CD, useValue: 'pwd=sdf&username=fdgd/sdfsdjlr45hsdjflk' },
    // { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
