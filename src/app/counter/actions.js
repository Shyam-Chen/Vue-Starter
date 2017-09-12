import { INCREMENT, DECREMENT } from './constants';

export default {
  increment({ commit }) {
    commit(INCREMENT);
  },
  decrement({ commit }) {
    commit(DECREMENT);
  },
  incrementIfOdd({ commit, state }) {
    if ((state.value + 1) % 2 === 0) {
      commit(INCREMENT);
    }
  },
  incrementAsync({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit(INCREMENT);
        resolve();
      }, 1000)
    })
  }
};
