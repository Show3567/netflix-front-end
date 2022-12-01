import { TestBed } from '@angular/core/testing';
import { AuthWithLocalInterceptor } from './auth-with-local.interceptor';

describe('AuthWithLocalInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthWithLocalInterceptor],
    })
  );

  xit('should be created', () => {
    const interceptor: AuthWithLocalInterceptor = TestBed.inject(
      AuthWithLocalInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
