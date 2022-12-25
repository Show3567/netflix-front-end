import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';

import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthNgrxService,
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
