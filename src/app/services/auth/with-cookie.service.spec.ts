import { TestBed } from '@angular/core/testing';

import { WithCookieService } from './with-cookie.service';

describe('WithCookieService', () => {
  let service: WithCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
