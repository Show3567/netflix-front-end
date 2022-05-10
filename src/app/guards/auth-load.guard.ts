import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanDeactivate,
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
export class AuthLoadGuard implements CanLoad {
  constructor(
    private readonly router: Router,
    private readonly withLocalstorageService: WithLocalstorageService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    const authToken = this.withLocalstorageService.userValue.jwtToken;
    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
