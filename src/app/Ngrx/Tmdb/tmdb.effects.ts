import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { SearchMovieReturn } from 'src/app/services/interfaces/searchMovidReturn.interface';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private getDiscoverMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TmdbActions.GetDiscoverMovie),
      exhaustMap(({ url }: { url: string }) => {
        return this.http.get<SearchMovieReturn>(url).pipe(
          map((data: SearchMovieReturn) => {
            return TmdbActions.GetDiscoverMovieSuccess({ data });
          }),
          catchError((err: any) => {
            return of(
              TmdbActions.GetDiscoverMovieFailed({ err: JSON.stringify(err) })
            );
          })
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
