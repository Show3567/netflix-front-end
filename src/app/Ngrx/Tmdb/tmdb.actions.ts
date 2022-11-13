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

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Movie
export const SendSearchMovie = createAction(
  '[ Movie ] Send Search Movie Request',
  props<{ url: string }>()
);

export const SearchMovieSuccess = createAction(
  '[ Movie ] Search Movie Success',
  props<{ data: SearchMovieReturn }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handle Scorller
export const SendHandleScrolMovie = createAction(
  '[ Movie ] Send Add Movies Request',
  props<{ url: string }>()
);

export const HandleScrolSuccess = createAction(
  '[ Movie ] Search Movie Success',
  props<{ data: SearchMovieReturn }>()
);

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Error Handler
export const ErrorCollectionUpdate = createAction(
  '[ Movie ] Get Discover Movie Failed',
  props<{ err: string }>()
);
