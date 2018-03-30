// @flow

import { of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import { IContent } from './constants';

export default {
  increment({ commit }: IContent): void {
    commit('increment');
  },
  decrement({ commit }: IContent): void {
    commit('decrement');
  },
  incrementAsync({ commit }: IContent): void {
    setTimeout(() => commit('increment'), 1000);
  },
  decrementAsync({ commit }: IContent): void {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => commit('decrement'));
  },
  incrementIfOdd({ commit, state }: IContent): void {
    if (Math.abs(state.value % 2) === 1) {
      commit('increment');
    }
  },
  decrementIfEven({ commit, state }: IContent): void {
    of(state.value)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(() => commit('decrement'));
  },
};
