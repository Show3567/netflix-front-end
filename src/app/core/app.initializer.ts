import { AuthService } from '../services/auth/auth.service';

let isInitialized = false;

export const appInitializer = (authService: AuthService) => {
  return () =>
    new Promise<void>((resolve) => {
      if (isInitialized) {
        console.log('Initialization skipped');
        resolve();
      }
      console.log('Initialization started');
      isInitialized = true;

      authService.refreshToken().subscribe({
        next: () => {
          console.log('Token refreshed successfully');
          resolve();
        },
        error: (err) => {
          console.error('Error refreshing token', err);
          resolve();
        },
      });
    });
};
