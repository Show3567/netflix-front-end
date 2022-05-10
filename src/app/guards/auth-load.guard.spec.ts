import { TestBed } from '@angular/core/testing';

import { AuthLoadGuard } from './auth-load.guard';

describe('AuthLoadGuard', () => {
  let guard: AuthLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
