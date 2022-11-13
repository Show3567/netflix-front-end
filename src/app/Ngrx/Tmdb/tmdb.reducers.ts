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
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Discover Movie
  on(
    TmdbActions.DiscoverMovieSuccess,
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
  on(TmdbActions.DiscoverMovieFailed, (state, { err }) => {
    return { ...initialState, err };
  }),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Movie
  on(
    TmdbActions.SearchMovieSuccess,
    (state, { data }: { data: SearchMovieReturn }) => {
      let movieList = state.movieList;
      if (movieList.length) {
        movieList = [...(data.results as Movie[])];
      } else {
        movieList = [...movieList, ...(data.results as Movie[])];
      }

      return {
        ...state,
        movieList,
      };
    }
  )
);
