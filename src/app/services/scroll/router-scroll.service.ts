import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouterScrollService {
  private positionState: any = {};
  // private positionState$ = new BehaviorSubject(this.positionState);
  private positionSignal = signal<{ [key: string]: [number, number] }>({});

  get positions() {
    // return this.positionState$.value;
    return this.positionSignal();
  }

  setPositionState(name: string, vertical: number, horizontal: number) {
    this.positionState[name] = [vertical, horizontal];
    // this.positionState$.next(this.positionState);
    console.log('record position: ', name, [vertical, horizontal]);
    this.positionSignal.update((position) => {
      return {
        ...position,
        [name]: [vertical, horizontal],
      };
    });
  }
}
