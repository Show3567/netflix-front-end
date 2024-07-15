import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

export const movieItemFnGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { jwtToken, role } = authService.userSignal();
  if (
    jwtToken &&
    role &&
    (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
  ) {
    return true;
  } else {
    router.navigate(['/register/step4'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};
