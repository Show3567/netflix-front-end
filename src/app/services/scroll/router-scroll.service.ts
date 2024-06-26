import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouterScrollService {
  private positionState: any = {};
  private positionState$ = new BehaviorSubject(this.positionState);

  get positions() {
    return this.positionState$.value;
  }

  setPositionState(name: string, vertical: number, horizontal: number) {
    this.positionState[name] = [vertical, horizontal];
    this.positionState$.next(this.positionState);
  }
}
