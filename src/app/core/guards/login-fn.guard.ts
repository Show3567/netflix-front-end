import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const loginFnGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { jwtToken } = authService.userSignal();
  if (!jwtToken) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
