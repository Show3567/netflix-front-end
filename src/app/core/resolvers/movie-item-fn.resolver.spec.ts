import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieItemFnResolver } from './movie-item-fn.resolver';

describe('movieItemFnResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieItemFnResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
