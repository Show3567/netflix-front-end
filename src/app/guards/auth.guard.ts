import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WithLocalstorageService } from '../services/auth/with-localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authToken = this.withLocalstorageService.userValue.jwtToken;
    if (authToken) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    const path = segments.reduce((path, segment) => {
      return `${path}/${segment.path}`;
    }, '');
    const authToken = this.withLocalstorageService.userValue.jwtToken;
    if (authToken) {
      console.log('hello');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
