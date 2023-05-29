import { TestBed } from '@angular/core/testing';

import { SseService } from './sse.service';
import { NgZone } from '@angular/core';

describe('SseService', () => {
  let service: SseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgZone],
    });
    service = TestBed.inject(SseService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
