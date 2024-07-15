import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { moviePosterFnResolver } from './movie-poster-fn.resolver';

describe('moviePosterFnResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => moviePosterFnResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
