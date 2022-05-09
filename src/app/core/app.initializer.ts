import { WithLocalstorageService } from '../services/auth/with-localstorage.service';

export function appInitializer(
  withLocalstorageService: WithLocalstorageService
) {
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      withLocalstorageService.refreshToken().subscribe().add(resolve);
    });
}
