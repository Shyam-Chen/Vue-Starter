// @flow

import { of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

export default {
  increment({ commit }) {
    commit('increment');
  },
  decrement({ commit }) {
    commit('decrement');
  },
  incrementAsync({ commit }) {
    setTimeout(() => commit('increment'), 1000);
  },
  decrementAsync({ commit }) {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => commit('decrement'));
  },
  incrementIfOdd({ commit, state }) {
    if (Math.abs(state.value % 2) === 1) {
      commit('increment');
    }
  },
  decrementIfEven({ commit, state }) {
    of(null)
      .pipe(filter(() => state.value % 2 === 0))
      .subscribe(() => commit('decrement'));
  },
};
