import { INCREMENT, DECREMENT } from './constants';

export default {
  [INCREMENT](state) {
    state.value++;
  },
  [DECREMENT](state) {
    state.value--;
  }
};
