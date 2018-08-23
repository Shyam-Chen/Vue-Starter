// @flow

import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

class ObservableBus {
  bus: Subject<any>;

  constructor() {
    this.bus = new Subject();
  }

  $emit(key: any, data?: any): void {
    this.bus.next({ key, data });
  }

  $on(key: any): Observable<any> {
    return this.bus.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => event.data),
      );
  }

  $off(): void {
    this.bus.unsubscribe();
  }
}

export default new ObservableBus();
