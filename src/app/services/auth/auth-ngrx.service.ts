import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as AuthActions from 'src/app/Ngrx/Auth/auth.actions';
import * as AuthSelectors from 'src/app/Ngrx/Auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthNgrxService {
  constructor(private readonly store: Store) {}

  /* SignOut */
  // logout() {
  //   localStorage.removeItem('access_token');
  //   this.tmdbService.setMyApiKey = '';

  //   this.stopRefreshTokenTimer();

  //   this.userSubject$.next({});
  //   this.router.navigate(['/home']);
  // }

  getCurValFromObs(obs: Observable<any>): any {
    let value: any;
    obs.pipe(take(1)).subscribe((val) => {
      value = val;
    });
    return value;
  }
}
