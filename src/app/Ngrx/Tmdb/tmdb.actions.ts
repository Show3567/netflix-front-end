import { createAction, props } from '@ngrx/store';
import { SearchMovieReturn } from 'src/app/services/interfaces/searchMovidReturn.interface';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Discover Movie
export const DiscoverMovie = createAction(
  '[ Movie ] Send Get Discover Movie Request',
  props<{ url: string }>()
);

export const DiscoverMovieSuccess = createAction(
  '[ Movie ] Get Discover Movie Success',
  props<{ data: SearchMovieReturn }>()
);

export const DiscoverMovieFailed = createAction(
  '[ Movie ] Get Discover Movie Failed',
  props<{ err: string }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Movie
export const SendSearchMovie = createAction(
  '[ Movie ] Send Search Movie Request',
  props<{ url: string }>()
);

export const SearchMovieSuccess = createAction(
  '[ Movie ] Search Movie Success',
  props<{ data: SearchMovieReturn }>()
);

export const SearchMovieFailed = createAction(
  '[ Movie ] Search Movie Failed',
  props<{ err: string }>()
);
