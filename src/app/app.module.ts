import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { TmdbService } from './services/tmdb/tmdb.service';
import { appInitializer } from './core/app.initializer';
import { AuthWithLocalInterceptor } from './core/interceptors/auth-with-local.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { WithCookieService } from './services/auth/with-cookie.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/* 
  myVpn_Activation_Code: E5Y82N8XKXQIYLURZHYAMSX
  $ E5Y82N8XKXQIYLURZHYAMSX
*/
