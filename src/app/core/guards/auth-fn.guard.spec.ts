import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authFnGuard } from './auth-fn.guard';

describe('authFnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authFnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
