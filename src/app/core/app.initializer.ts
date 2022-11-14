import { AuthNgrxService } from '../Ngrx/Auth/auth-ngrx.service';
import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthNgrxService) {
  console.log('this is Initialization');
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      authService.refreshToken();
      // .subscribe().add(resolve);
    });
}
