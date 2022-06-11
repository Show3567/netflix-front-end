import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: WithLocalstorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const authToken = this.authService.userValue.jwtToken;
        if ([401, 403].includes(err.status) && authToken) {
          // auto logout if 401 or 403 response returned from api
          this.authService.logout();
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        return throwError(error);
      })
    );
  }
}