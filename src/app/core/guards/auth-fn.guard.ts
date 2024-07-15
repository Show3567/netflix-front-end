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
  const claimType: string = route.data.claimType;

  if (jwtToken && role && claimType.includes(role)) {
    return true;
  } else {
    router.navigate(['/register/step4']);
    return false;
  }
};
