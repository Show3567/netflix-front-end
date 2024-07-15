// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
// } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// import { CoreModule } from './core/core.module';
// import { AppComponent } from './app.component';

// import { AppRoutingModule } from './app-routing.module';
// import { SharedModule } from './shared/shared.module';

// @NgModule({
//   declarations: [AppComponent],
//   bootstrap: [AppComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     CoreModule.forRoot(),
//     SharedModule,
//     LoggerModule.forRoot({
//       serverLoggingUrl: '/api/logs',
//       level: NgxLoggerLevel.DEBUG,
//       serverLogLevel: NgxLoggerLevel.ERROR,
//     }),
//   ],
//   providers: [provideHttpClient(withInterceptorsFromDi())],
// })
// export class AppModule {}
