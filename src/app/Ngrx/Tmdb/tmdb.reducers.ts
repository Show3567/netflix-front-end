import { createReducer, on } from '@ngrx/store';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';

const initialState = {};

export const TmdbReducer = createReducer(
  initialState,
  on(TmdbActions.GetDiscoverMovieSuccess, (state) => {
    return state;
  }),
  on(TmdbActions.GetDiscoverMovieFailed, (state) => {
    return state;
  })
);
