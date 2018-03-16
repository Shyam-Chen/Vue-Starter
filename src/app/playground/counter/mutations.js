// @flow

import { ICounter } from './constants';

export default {
  increment(state: ICounter): void {
    state.value += 1;
  },
  decrement(state: ICounter): void {
    state.value -= 1;
  },
};
