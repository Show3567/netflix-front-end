import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SseService {
  readonly url = 'http://localhost:4231/sse';

  constructor(private readonly zone: NgZone) {}

  getServerSendEvent() {
    return Observable.create((observer: any) => {
      const eventSource = new EventSource(this.url);

      eventSource.onmessage = (event) =>
        this.zone.run(() => {
          observer.next(event);
        });

      eventSource.onerror = (error) =>
        this.zone.run(() => {
          observer.error(error);
        });
    });
  }
}
