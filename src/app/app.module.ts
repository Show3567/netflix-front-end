import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule, YouTubePlayer } from '@angular/youtube-player';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRowOneComponent } from './components/main/main-row-one/main-row-one.component';
import { MainHeaderComponent } from './components/main/main-header/main-header.component';
import { MainRowTwoComponent } from './components/main/main-row-two/main-row-two.component';
import { MainRowThreeComponent } from './components/main/main-row-three/main-row-three.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainFooterComponent } from './components/main/main-footer/main-footer.component';
import { MainQuestionsComponent } from './components/main/main-questions/main-questions.component';
import { PageOneComponent } from './components/register/page-one/page-one.component';
import { PageTwoComponent } from './components/register/page-two/page-two.component';
import { PageThreeComponent } from './components/register/page-three/page-three.component';
import { PageFourComponent } from './components/register/page-four/page-four.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ItemComponent } from './components/movies/item/item.component';
import { MovieItemComponent } from './pages/movie-item/movie-item.component';

export const TMDBAPIKEY = new InjectionToken<string>('');

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainRowOneComponent,
    MainHeaderComponent,
    MainRowTwoComponent,
    MainRowThreeComponent,
    MainFooterComponent,
    MainQuestionsComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    PageFourComponent,
    MoviesComponent,
    ItemComponent,
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
  ],
  providers: [
    { provide: TMDBAPIKEY, useValue: 'ac7e1f44cec0dd6e260391374208b0cc' },
    YouTubePlayer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
