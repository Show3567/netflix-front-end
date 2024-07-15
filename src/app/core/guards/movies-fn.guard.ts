import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const moviesFnGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { jwtToken } = authService.userSignal();

  if (jwtToken) {
    return true;
  } else {
    router.navigate(['login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};
