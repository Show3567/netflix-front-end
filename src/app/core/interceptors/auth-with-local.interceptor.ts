import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AUTHSERVER } from '../core.module';

@Injectable()
export class AuthWithLocalInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTHSERVER) private authServerPath: string
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.userSignal();
    console.log('user.jwtToken: ', user.jwtToken);

    const isApiUrl = request.url.startsWith(`${this.authServerPath}/auth/sign`);

    if (user && user.jwtToken && !isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: user.jwtToken },
      });
    }

    return next.handle(request).pipe(tap());
  }
}
