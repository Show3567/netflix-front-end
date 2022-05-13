import { TestBed } from '@angular/core/testing';

import { MoviesGuard } from './movies.guard';

describe('MoviesGuard', () => {
  let guard: MoviesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MoviesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
