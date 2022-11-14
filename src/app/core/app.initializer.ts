import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthNgrxService } from '../Ngrx/Auth/auth-ngrx.service';

export function appInitializer(authService: AuthNgrxService) {
  console.log('this is Initialization');

  return () => of().pipe(tap(() => authService.refreshToken()));
}
