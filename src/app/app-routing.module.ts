import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFourComponent } from './components/register/page-four/page-four.component';
import { PageOneComponent } from './components/register/page-one/page-one.component';
import { PageThreeComponent } from './components/register/page-three/page-three.component';
import { PageTwoComponent } from './components/register/page-two/page-two.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'step1', component: PageOneComponent },
      { path: 'step2', component: PageTwoComponent },
      { path: 'step3', component: PageThreeComponent },
      { path: 'step4', component: PageFourComponent },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
