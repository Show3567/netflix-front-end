import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckIdleService {
  private idleCheckInterval$ = interval(60 * 1000);
  private userActivitySubject = new Subject<void>();
  private start = Date.now();
  private readonly idleLimit = 5 * 60 * 1000;

  constructor() {
    this.monitorIdleStatus();
  }

  private monitorIdleStatus(): Observable<any> {
    return this.userActivitySubject.pipe(
      startWith(0),
      switchMap(() => {
        this.start = Date.now();
        return this.idleCheckInterval$;
      }),
      tap(() => {
        const now = Date.now();
        const idleTime = now - this.start;

        if (idleTime >= this.idleLimit) {
          console.log('User is idle');
          this.onIdleDetected();
          this.start = Date.now();
        }
      })
    );
  }

  // Method to be called from components to signal user activity
  notifyUserActivity(): void {
    this.userActivitySubject.next();
  }

  private onIdleDetected(): void {
    // Handle idle detection (e.g., logout the user, show warning, etc.)
    // This method can be extended or modified to emit events or call other services.
  }
}
