import { INCREMENT, DECREMENT } from './constants';

export default {
  increment({ commit }) {
    commit(INCREMENT);
  },
  decrement({ commit }) {
    commit(DECREMENT);
  },
  incrementAsync({ commit }) {
    setTimeout(() => commit(INCREMENT), 1000);
  },
  incrementIfOdd({ commit, state }) {
    if (state.value % 2 === 1) {
      commit(INCREMENT);
    }
  }
};
