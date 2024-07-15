import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieCreditFnResolver } from './movie-credit-fn.resolver';

describe('movieCreditFnResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieCreditFnResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
