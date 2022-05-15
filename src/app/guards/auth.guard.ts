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
import { UserRole } from '../services/interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { jwtToken, role } = this.withLocalstorageService.userValue;
    const claimType: string = next.data.claimType;

    if (jwtToken && role && claimType.includes(role)) {
      return true;
    } else {
      this.router.navigate(['/register/step4']);
      return false;
    }
  }
}
