export const state = { value: 0 };

export const INCREMENT = '[Counter] INCREMENT';
export const DECREMENT = '[Counter] DECREMENT';

export const mutations = {
  [INCREMENT](state) {
    state.value++
  },
  [DECREMENT](state) {
    state.value--
  }
};

export const actions = {
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

export const getters = {
  evenOrOdd: state => state.value % 2 === 0 ? 'even' : 'odd'
};
