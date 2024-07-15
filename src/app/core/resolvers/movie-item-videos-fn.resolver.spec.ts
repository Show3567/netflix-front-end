import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieItemVideosFnResolver } from './movie-item-videos-fn.resolver';

describe('movieItemVideosFnResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieItemVideosFnResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
