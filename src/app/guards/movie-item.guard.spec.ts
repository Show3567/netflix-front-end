import { TestBed } from '@angular/core/testing';

import { MovieItemGuard } from './movie-item.guard';

describe('MovieItemGuard', () => {
  let guard: MovieItemGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MovieItemGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
