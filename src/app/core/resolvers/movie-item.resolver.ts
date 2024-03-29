import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class MovieItemResolver {
  constructor(private readonly tmdbService: TmdbService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tmdbService.getMovie(+route.params.id);
  }
}
