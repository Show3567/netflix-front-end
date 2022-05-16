import { WithLocalstorageService } from '../services/auth/with-localstorage.service';

export function appInitializer(authService: WithLocalstorageService) {
  console.log('this is initialization');
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      authService.refreshToken().subscribe().add(resolve);
    });
}
