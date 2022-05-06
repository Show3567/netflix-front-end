import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieItemComponent } from './pages/movie-item/movie-item.component';
import { ComponentsModule } from './components/components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const TMDBAPIKEY = new InjectionToken<string>('');

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

    RegisterComponent,
    HomeComponent,
    MoviesComponent,
    MovieItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    ComponentsModule,
    InfiniteScrollModule,
  ],
  providers: [
    { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
