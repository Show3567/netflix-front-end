import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

export const movieCreditFnResolver: ResolveFn<Observable<any>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const tmdbService = inject(TmdbService);

  return tmdbService.getCredits(+route.params.id).pipe(
    map((credit) => {
      return credit.cast?.splice(0, 10);
    }),
  );
};
