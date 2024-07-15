import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginFnGuard } from './login-fn.guard';

describe('loginFnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginFnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
