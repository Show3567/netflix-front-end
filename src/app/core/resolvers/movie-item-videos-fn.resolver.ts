import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

export const movieItemVideosFnResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const tmdbService = inject(TmdbService);

  return tmdbService.getVideo(+route.params.id);
};
