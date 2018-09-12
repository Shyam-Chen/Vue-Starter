// @flow

import { of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import { IContent } from './types';

export default {
  // sync action
  increment({ state, commit }: IContent): void {
    commit('increment', state.step);
  },
  // sync action
  decrement({ state, commit }: IContent): void {
    commit('decrement', state.step);
  },
  // thunk action
  incrementAsync({ dispatch }: IContent): void {
    setTimeout(() => dispatch('increment'), 1000);
  },
  // observable action
  decrementAsync({ dispatch }: IContent): void {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => dispatch('decrement'));
  },
  // thunk action
  incrementIfOdd({ state, dispatch }: IContent): void {
    if (Math.abs(state.value % 2) === 1) {
      dispatch('increment');
    }
  },
  // observable action
  decrementIfEven({ state, dispatch }: IContent): void {
    of(state.value)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(() => dispatch('decrement'));
  },
};
