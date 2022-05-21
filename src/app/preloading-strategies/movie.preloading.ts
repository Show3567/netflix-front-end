import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, loadme: () => Observable<any>): Observable<any> {
    if (route.data && route.data['delay']) {
      const delay: number = route.data['delay'];

      return timer(delay).pipe(
        mergeMap((_) => {
          return loadme();
        })
      );
    } else {
      return of(null);
    }
  }
}
