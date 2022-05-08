import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { WithCookieService } from './services/auth/with-cookie.service';
import { WithLocalstorageService } from './services/auth/with-localstorage.service';

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
    { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
    { provide: AUTHSERVER, useValue: 'http://localhost:4231' },
    { provide: USECOOKIE, useValue: false },
    {
      provide: AuthService,
      useFactory: (
        usecookie: boolean,
        router: Router,
        http: HttpClient,
        authpath: string
      ) =>
        usecookie
          ? new WithCookieService(router, http, authpath)
          : new WithLocalstorageService(router, http, authpath),

      deps: [USECOOKIE, Router, HttpClient, AUTHSERVER],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
