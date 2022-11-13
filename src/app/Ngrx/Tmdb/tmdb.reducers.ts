import { createReducer, on } from '@ngrx/store';

import { SearchMovieReturn } from 'src/app/services/interfaces/searchMovidReturn.interface';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { TmdbState } from '../interfaces/tmdb.interface';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';

const initialState: TmdbState = {
  movieList: [],
  recommendList: [],
  err: '',
};

export const TmdbReducer = createReducer(
  initialState,
  on(
    TmdbActions.GetDiscoverMovieSuccess,
    (state, { data }: { data: SearchMovieReturn }) => {
      const movieList = [...(data.results as Movie[])];
      const recommendList = [...movieList.slice(0, 7)];

      return {
        ...state,
        movieList,
        recommendList,
      };
    }
  ),
  on(TmdbActions.GetDiscoverMovieFailed, (state, { err }) => {
    return { ...initialState, err };
  })
);
