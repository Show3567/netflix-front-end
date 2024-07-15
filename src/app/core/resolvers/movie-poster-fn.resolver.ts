import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

export const moviePosterFnResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const tmdbService = inject(TmdbService);

  return tmdbService.getPosters(+route.params.id).pipe(
    map((movieimage) => {
      return movieimage.backdrops?.splice(0, 10);
    }),
  );
};
