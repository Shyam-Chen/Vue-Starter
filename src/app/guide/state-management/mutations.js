// @flow

import { ICounter } from './types';

// reducer
export default {
  increment(state: ICounter, value: number): void {
    state.value += value;
  },
  decrement(state: ICounter, value: number): void {
    state.value -= value;
  },
};
