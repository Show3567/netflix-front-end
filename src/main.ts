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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CoreModule } from './app/core/core.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { routes } from './app/routes';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
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
