import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { moviesFnGuard } from './movies-fn.guard';

describe('moviesFnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => moviesFnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
