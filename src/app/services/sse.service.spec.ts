import { TestBed } from '@angular/core/testing';

import { SseService } from './sse.service';
import { NgZone } from '@angular/core';

fdescribe('SseService', () => {
  let service: SseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgZone],
    });
    service = TestBed.inject(SseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable after call getServerSendEvent fn', () => {
    const spy = spyOn(service, 'getServerSendEvent');
    service.getServerSendEvent();

    expect(typeof spy).toBe('observable'); // ??
  });
});
