import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { delay, retryWhen, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DelayedRetryService {
  DEFAULT_MAX_RETRIES = 5;

  constructor() {}

  delayedRetry = (delayMs: number, maxRetry = this.DEFAULT_MAX_RETRIES) => {
    let retries = maxRetry;
    return (src: Observable<any>) => {
      return src.pipe(
        retryWhen((error: Observable<any>) => {
          return error.pipe(
            delay(delayMs),
            mergeMap((error) => {
              return 0 < retries--
                ? of(error)
                : throwError(this.getErrorMessage(maxRetry));
            })
          );
        })
      );
    };
  };

  private getErrorMessage(maxRetry: number): string {
    return `Tried to load Resources over XHR for ${maxRetry} times without success, Giving up.`;
  }
}
