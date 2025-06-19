import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authFnGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { jwtToken, role } = authService.userSignal();
  const claimType = route.data['claimType'];

  // support both string and array of strings
  const allowedRoles: string[] = Array.isArray(claimType)
    ? claimType
    : typeof claimType === 'string'
      ? [claimType]
      : [];

  if (jwtToken && role && allowedRoles.includes(role)) {
    return true;
  } else {
    router.navigate(['/register/step4']);
    return false;
  }
};
