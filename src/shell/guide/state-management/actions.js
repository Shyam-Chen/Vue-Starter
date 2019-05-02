// @flow

import { ActionContext } from 'vuex';
import { of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import { ICounter } from './types';

export default {
  // sync action
  increment({ state, commit }: ActionContext<ICounter>): void {
    commit('increment', state.step);
  },
  // sync action
  decrement({ state, commit }: ActionContext<ICounter>): void {
    commit('decrement', state.step);
  },
  // thunk action
  incrementAsync({ dispatch }: ActionContext<ICounter>): void {
    setTimeout(() => dispatch('increment'), 1000);
  },
  // observable action
  decrementAsync({ dispatch }: ActionContext<ICounter>): void {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => dispatch('decrement'));
  },
  // thunk action
  incrementIfOdd({ state, dispatch }: ActionContext<ICounter>): void {
    if (Math.abs(state.value % 2) === 1) {
      dispatch('increment');
    }
  },
  // observable action
  decrementIfEven({ state, dispatch }: ActionContext<ICounter>): void {
    of(state.value)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(() => dispatch('decrement'));
  },
};
