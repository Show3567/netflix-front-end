import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';

@Injectable({
  providedIn: 'root',
})
export class MovieItemResolver  {
  constructor(private readonly tmdbService: TmdbNgrxService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tmdbService.getMovie(+route.params.id);
  }
}
