import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieItemGuard  {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
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
