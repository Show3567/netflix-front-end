import { createAction, props } from '@ngrx/store';
import { SearchMovieReturn } from 'src/app/services/interfaces/searchMovidReturn.interface';

export const GetDiscoverMovie = createAction(
  '[ Movie ] Send Get Discover Movie Request',
  props<{ url: string }>()
);

export const GetDiscoverMovieSuccess = createAction(
  '[ Movie ] Get Discover Movie Success',
  props<{ data: SearchMovieReturn }>()
);

export const GetDiscoverMovieFailed = createAction(
  '[ Movie ] Get Discover Movie Failed',
  props<{ err: string }>()
);
