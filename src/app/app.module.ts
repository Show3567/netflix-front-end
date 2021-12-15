import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
