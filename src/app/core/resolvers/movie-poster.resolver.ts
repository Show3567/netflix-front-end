import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviePosterResolver implements Resolve<any> {
  constructor(private readonly tmdbService: TmdbService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tmdbService.getCredits(+route.params.id).pipe(
      map((credit) => {
        return credit.cast?.splice(0, 10);
      })
    );
  }
}
