import { TestBed } from '@angular/core/testing';

import { WithLocalstorageService } from './with-localstorage.service';

describe('WithLocalstorageService', () => {
  let service: WithLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
