import { AuthNgrxService } from '../Ngrx/Auth/auth-ngrx.service';
import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthNgrxService) {
  console.log('this is Initialization');

  return () =>
    new Promise<void>((resolve, reject) => {
      authService.refreshToken();
      resolve();
    });
}
