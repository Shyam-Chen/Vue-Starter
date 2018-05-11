// @flow

import { of } from 'rxjs';  // eslint-disable-line
import { delay, filter } from 'rxjs/operators';

import { IContent } from './constants';

export default {
  increment({ state, commit }: IContent): void {
    commit('increment', state.step);
  },
  decrement({ state, commit }: IContent): void {
    commit('decrement', state.step);
  },
  incrementAsync({ dispatch }: IContent): void {
    setTimeout(() => dispatch('increment'), 1000);
  },
  decrementAsync({ dispatch }: IContent): void {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => dispatch('decrement'));
  },
  incrementIfOdd({ state, dispatch }: IContent): void {
    if (Math.abs(state.value % 2) === 1) {
      dispatch('increment');
    }
  },
  decrementIfEven({ state, dispatch }: IContent): void {
    of(state.value)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(() => dispatch('decrement'));
  },
};
