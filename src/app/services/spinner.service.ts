import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisible.asObservable();

  show(): void {
    this.isVisible.next(true);
  }

  hide(delay: number = 0): void {
    if (delay > 0) {
      setTimeout(() => {
        this.isVisible.next(false);
      }, delay);
    } else {
      this.isVisible.next(false);
    }
  }
}
