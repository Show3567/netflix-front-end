import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { WithLocalstorageService } from '../../services/auth/with-localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: WithLocalstorageService,
    private readonly router: Router
  ) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const { jwtToken } = this.authService.userValue;
    if (!jwtToken) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
