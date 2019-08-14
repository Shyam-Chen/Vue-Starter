// @flow

import { ActionContext } from 'vuex';

import { ICounter } from './types';

export default {
  // sync action
  increment({ state, commit }: ActionContext<ICounter>): void {
    commit('increment', state.step);
  },
  decrement({ state, commit }: ActionContext<ICounter>): void {
    commit('decrement', state.step);
  },
  // thunk action
  incrementAsync({ dispatch }: ActionContext<ICounter>): void {
    setTimeout(() => dispatch('increment'), 1000);
  },
  decrementAsync({ dispatch }: ActionContext<ICounter>): void {
    setTimeout(() => dispatch('decrement'), 1000);
  },
  incrementIfOdd({ state, dispatch }: ActionContext<ICounter>): void {
    if (Math.abs(state.value % 2) === 1) {
      dispatch('increment');
    }
  },
  // observable action
  decrementIfEven({ state, dispatch }: ActionContext<ICounter>): void {
    if (Math.abs(state.value % 2) === 0) {
      dispatch('decrement');
    }
  },
};
