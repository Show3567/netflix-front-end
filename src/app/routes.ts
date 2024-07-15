import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { MoviesGuard } from './core/guards/movies.guard';
import { MovieItemGuard } from './core/guards/movie-item.guard';
import { UserRole } from './services/interfaces/user-auth.interface';

import { MovieCreditResolver } from './core/resolvers/movie-credit.resolver';
import { MovieItemVideosResolver } from './core/resolvers/movie-item-videos.resolver';
import { MovieItemResolver } from './core/resolvers/movie-item.resolver';
import { MoviePosterResolver } from './core/resolvers/movie-poster.resolver';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageOneComponent } from './pages/register/components/page-one/page-one.component';

import { PageTwoComponent } from './pages/register/components/page-two/page-two.component';
import { PageFourComponent } from './pages/register/components/page-four/page-four.component';
import { PageThreeComponent } from './pages/register/components/page-three/page-three.component';
import { PageTwoIiComponent } from './pages/register/components/page-two-ii/page-two-ii.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieItemComponent } from './pages/movie-item/movie-item.component';

const notFoundRoutes: Routes = [{ path: '', component: PageNotFoundComponent }];
const homeRoutes: Routes = [{ path: '', component: HomeComponent }];
const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
];
const registerRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      { path: 'step1', component: PageOneComponent },
      { path: 'step2', component: PageTwoComponent },
      { path: 'step2ii', component: PageTwoIiComponent },
      { path: 'step3', component: PageThreeComponent },
      { path: 'step4', component: PageFourComponent },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },
];
const moviesRoutes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [MoviesGuard],
    data: { claimType: [UserRole.ADMIN, UserRole.SUPERUSER, UserRole.USER] },
  },
];
const movieDetailsRoutes: Routes = [
  {
    path: '',
    component: MovieItemComponent,
    canActivate: [MovieItemGuard],
    data: {
      claimType: [UserRole.ADMIN, UserRole.SUPERUSER],
    },
  },
];

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    loadChildren: () => homeRoutes,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    loadChildren: () => loginRoutes,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    loadChildren: () => registerRoutes,
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/movies.component').then((c) => c.MoviesComponent),
    loadChildren: () => moviesRoutes,

    /* we cannot use route guard and preloading in the same time! */
    data: { preload: true, delay: 1000 },
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./pages/movie-item/movie-item.component').then(
        (c) => c.MovieItemComponent,
      ),
    loadChildren: () => movieDetailsRoutes,
    canLoad: [MovieItemGuard],
    resolve: {
      videos: MovieItemVideosResolver,
      movie: MovieItemResolver,
      credits: MovieCreditResolver,
      posters: MoviePosterResolver,
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent,
      ),
    loadChildren: () => notFoundRoutes,
  },
];
