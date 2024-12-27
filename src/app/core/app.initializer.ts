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
// export const appInitializer = (authService: AuthService) => {
//   console.log('this is Initialization');
//   return () =>
//     new Promise((resolve) => {
//       // attempt to refresh token on app start up to auto authenticate
//       authService
//         .refreshToken()
//         .subscribe()
//         .add(() => resolve);
//     });
// };

// export const appInitializer = (authService: AuthService) => {
//   console.log('Initialization started');
//   return () =>
//     new Promise<void>((resolve, reject) => {
//       authService.refreshToken().subscribe({
//         next: () => {
//           console.log('Token refreshed successfully');
//           resolve();
//         },
//         error: (err) => {
//           console.error('Error refreshing token', err);
//           resolve();
//         },
//       });
//     });
// };
