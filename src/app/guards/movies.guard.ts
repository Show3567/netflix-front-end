import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WithLocalstorageService } from '../services/auth/with-localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesGuard implements CanLoad {
  constructor(
    private router: Router,
    private withLocalstorageService: WithLocalstorageService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    const { jwtToken } = this.withLocalstorageService.userValue;
    if (jwtToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
