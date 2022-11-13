import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';

@Injectable()
export class AuthEffects {
  // private getDiscoverMovies$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TmdbActions.GetDiscoverMovie),
  //     exhaustMap(({url}: {url: string}) => {
  //       return this.http.get(url)
  //     })
  //   )
  // );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
