import { TestBed } from '@angular/core/testing';

import { DelayedRetryService } from './delayed-retry.service';

describe('DelayedRetryService', () => {
  let service: DelayedRetryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayedRetryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
