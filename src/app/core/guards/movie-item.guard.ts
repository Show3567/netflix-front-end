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
import { WithLocalstorageService } from '../../services/auth/with-localstorage.service';
import { UserRole } from '../../services/interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieItemGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private authService: WithLocalstorageService
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
