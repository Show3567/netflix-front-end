import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WithLocalstorageService } from '../services/auth/with-localstorage.service';
import { UserRole } from '../services/interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieItemGuard implements CanLoad {
  constructor(
    private router: Router,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    const { jwtToken, role } = this.withLocalstorageService.userValue;
    if (
      jwtToken &&
      role &&
      (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
