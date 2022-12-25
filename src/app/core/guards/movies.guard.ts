import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesGuard implements CanLoad, CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthNgrxService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { jwtToken } = this.authService.userValue;

    if (jwtToken) {
      return true;
    } else {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    const { jwtToken } = this.authService.userValue;
    if (jwtToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
