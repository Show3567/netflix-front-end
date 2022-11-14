import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AUTHSERVER } from '../core.module';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';

@Injectable()
export class AuthWithLocalInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthNgrxService,
    @Inject(AUTHSERVER) private autoServerPath: string
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.authService.userValue;

    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = request.url.startsWith(
      `${this.autoServerPath}/auth/userupdate`
    );
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
      });
    }

    return next.handle(request).pipe(tap());
  }
}
