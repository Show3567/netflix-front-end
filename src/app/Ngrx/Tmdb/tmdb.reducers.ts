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

      console.log('wtf: ', movieList, recommendList);

      return {
        ...state,
        movieList,
        recommendList,
      };
    }
  ),
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
  ),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handle Scroller
  on(
    TmdbActions.HandleScrolSuccess,
    (state, { data }: { data: SearchMovieReturn }) => {
      const movieList = [...state.movieList, ...(data.results as Movie[])];
      const recommendList = [...movieList.slice(0, 7)];

      return {
        ...state,
        movieList,
        recommendList,
      };
    }
  ),
  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Error Handler
  on(TmdbActions.ErrorCollectionUpdate, (state, { err }) => {
    return { ...initialState, err };
  })
);
