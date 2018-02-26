import { INCREMENT, DECREMENT } from './constants';

export default {
  [INCREMENT](state) {
    state.value += 1;
  },
  [DECREMENT](state) {
    state.value -= 1;
  },
};
