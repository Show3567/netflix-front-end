import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { MovieItemGuard } from './guards/movie-item.guard';
import { MoviesGuard } from './guards/movies.guard';
import { MovieItemVideosResolver } from './resolvers/movie-item-videos.resolver';
import { MovieItemResolver } from './resolvers/movie-item.resolver';
import { MoviePreloadingStrategy } from './preloading-strategies/movie.preloading';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
    // canLoad: [MoviesGuard],

    /* we cannot use route guard and preloading in the same time! */
    data: { preload: true, delay: 1000 },
  },
  {
    path: 'movies/:id',
    loadChildren: () =>
      import('./pages/movie-item/movie-item.module').then(
        (m) => m.MovieItemModule
      ),
    canLoad: [MovieItemGuard],
    resolve: { videos: MovieItemVideosResolver, movie: MovieItemResolver },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: MoviePreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/** preloading strategy
 * abstract preload(route: Route, fn: () => Observable<any>): Observable<any>
 * @param { Route } route
 * @param { () => Observable<any> } fn
 * @return { Observable<any> }
 */
