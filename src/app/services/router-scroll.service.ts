import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouterScrollService implements OnInit {
  private positionState: any = {};
  private positionState$ = new BehaviorSubject(this.positionState);

  get positions() {
    return this.positionState$.value;
  }

  ngOnInit(): void {}

  setPositionState(name: string, x: number, y: number) {
    this.positionState[name] = [x, y];
    this.positionState$.next(this.positionState);
  }
}
