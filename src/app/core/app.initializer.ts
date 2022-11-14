import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthNgrxService } from '../Ngrx/Auth/auth-ngrx.service';

export function appInitializer(authService: AuthNgrxService) {
  console.log('this is Initialization');

  return () =>
    new Promise<void>((resolve, reject) => {
      authService.refreshToken();
      resolve();
    });
  // of().pipe(
  //   tap(() => {
  //     console.log('trigger from initializer!');
  //     authService.refreshToken();
  //   })
  // );
}
