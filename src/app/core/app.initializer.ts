import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthService) {
  console.log('this is Initialization');

  return () =>
    new Promise<void>((resolve, reject) => {
      authService.refreshToken();
      resolve();
    });
}
