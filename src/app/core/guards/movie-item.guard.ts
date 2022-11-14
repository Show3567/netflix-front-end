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
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieItemGuard implements CanLoad, CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthNgrxService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { jwtToken, role } = this.authService.userValue;
    if (
      jwtToken &&
      role &&
      (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
    ) {
      return true;
    } else {
      this.router.navigate(['/register/step4'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    const { jwtToken, role } = this.authService.userValue;
    if (
      jwtToken &&
      role &&
      (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
    ) {
      return true;
    } else {
      this.router.navigate(['/register/step4']);
      return false;
    }
  }
}
