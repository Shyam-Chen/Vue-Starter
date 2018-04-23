// @flow

import { ICounter } from './constants';

export default {
  increment(state: ICounter, value: number): void {
    state.value += value;
  },
  decrement(state: ICounter, value: number): void {
    state.value -= value;
  },
};
