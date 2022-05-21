import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { WithLocalstorageService } from '../services/auth/with-localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: WithLocalstorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { jwtToken, role } = this.authService.userValue;
    const claimType: string = next.data.claimType;

    if (jwtToken && role && claimType.includes(role)) {
      return true;
    } else {
      this.router.navigate(['/register/step4']);
      return false;
    }
  }
}
