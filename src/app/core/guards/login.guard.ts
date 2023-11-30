import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(
    private readonly authService: AuthNgrxService,
    private readonly router: Router
  ) {
    console.log('this is login guard');
  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const { jwtToken } = this.authService.userValue;
    console.log(jwtToken);
    return true;
    // if (!jwtToken) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    //   return false;
    // }
  }
}
