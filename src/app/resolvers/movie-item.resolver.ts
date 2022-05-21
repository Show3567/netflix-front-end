import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TmdbService } from '../services/tmdb/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class MovieItemResolver implements Resolve<any> {
  constructor(private readonly tmdbService: TmdbService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tmdbService.getMovie(+route.params.id);
  }
}
