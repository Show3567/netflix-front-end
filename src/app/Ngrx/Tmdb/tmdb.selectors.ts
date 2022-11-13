import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TmdbState } from '../interfaces/tmdb.interface';

const selectTmdbMovies = createFeatureSelector<TmdbState>('auth');

export const getMovies = createSelector(
  selectTmdbMovies,
  (state: TmdbState) => state.movieList
);
export const getCommendList = createSelector(
  selectTmdbMovies,
  (state: TmdbState) => state.recommendList
);
