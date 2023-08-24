import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';

@Injectable({
  providedIn: 'root',
})
export class MovieCreditResolver  {
  constructor(private readonly tmdbService: TmdbNgrxService) {}

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
