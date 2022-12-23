import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

import { AuthReducer } from './Ngrx/Auth/auth.reducers';
import { AuthEffects } from './Ngrx/Auth/auth.effects';
import { TmdbReducer } from './Ngrx/Tmdb/tmdb.reducers';
import { TmdbEffects } from './Ngrx/Tmdb/tmdb.effects';
import { PositionReducer } from './Ngrx/Scroll/scroll.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    StoreModule.forRoot({
      auth: AuthReducer,
      tmdbMovies: TmdbReducer,
      positionRecord: PositionReducer,
    }),
    EffectsModule.forRoot([AuthEffects, TmdbEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Movie Web',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/* by ngrx and services */
