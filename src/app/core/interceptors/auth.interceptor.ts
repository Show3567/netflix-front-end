import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AUTHSERVER } from '../core.module';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authServerPath = inject(AUTHSERVER);

  const user = authService.userSignal();
  const isApiUrl = req.url.startsWith(`${authServerPath}/auth/sign`);

  if (user && user.jwtToken && !isApiUrl) {
    req = req.clone({
      setHeaders: { Authorization: user.jwtToken },
    });
  }

  return next(req);
};
