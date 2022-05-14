import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { WithLocalstorageService } from './services/auth/with-localstorage.service';
import { AuthWithLocalInterceptor } from './interceptors/auth-with-local.interceptor';
import { appInitializer } from './core/app.initializer';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const USECOOKIE = new InjectionToken<string>('');

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
    // { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
    // { provide: USECOOKIE, useValue: false },
    // {
    //   provide: AuthService,
    //   useFactory: (
    //     usecookie: boolean,
    //     router: Router,
    //     http: HttpClient,
    //     tmdbservice: TmdbService,
    //     authpath: string
    //   ) => {
    //     return usecookie
    //       ? new WithCookieService(router, http, authpath)
    //       : new WithLocalstorageService(router, http, tmdbservice, authpath);
    //   },
    //   deps: [USECOOKIE, Router, HttpClient, TmdbService, AUTHSERVER],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
