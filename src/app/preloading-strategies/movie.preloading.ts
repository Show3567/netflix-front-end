import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, loadMe: () => Observable<any>): Observable<any> {
    console.log('route.data: ', route.data);

    if (route.data && route.data['preload']) {
      const delay: number = route.data['delay'];
      console.log('preload called on ' + route.path + ' delay is ' + delay);

      return timer(delay).pipe(
        mergeMap((_) => {
          console.log('Loading now ' + route.path);
          return loadMe();
        })
      );
    } else {
      console.log('no preload for the path ' + route.path);
      return of(null);
    }
  }
}
