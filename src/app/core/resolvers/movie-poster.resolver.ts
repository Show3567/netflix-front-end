import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviePosterResolver  {
  constructor(private readonly tmdbService: TmdbService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tmdbService.getPosters(+route.params.id).pipe(
      map((movieimage) => {
        return movieimage.backdrops?.splice(0, 10);
      })
    );
  }
}
