import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CoreModule } from './app/core/core.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { routes } from './app/routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { errorFnInterceptor } from './app/core/interceptors/error-fn.interceptor';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorFnInterceptor]),
    ),
    provideRouter(routes),
    provideAnimations(),

    importProvidersFrom(
      CoreModule.forRoot(),
      LoggerModule.forRoot({
        serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
      }),
    ),
  ],
};

bootstrapApplication(AppComponent, appConfig);
