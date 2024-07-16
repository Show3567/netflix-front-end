import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

export const errorFnInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      const authToken = authService.userSignal().jwtToken;
      if ([401, 403].includes(err.status) && authToken) {
        // auto logout if 401 or 403 response returned from api
        authService.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }),
  );
};
