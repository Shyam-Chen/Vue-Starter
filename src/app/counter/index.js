export const state = { value: 0 };

export const mutations = {
  increment(state) {
    state.value++
  },
  decrement(state) {
    state.value--
  }
};

export const actions = {
  increment({ commit }) {
    commit('increment');
  },
  decrement({ commit }) {
    commit('decrement');
  },
  incrementIfOdd({ commit, state }) {
    if ((state.value + 1) % 2 === 0) {
      commit('increment');
    }
  },
  incrementAsync({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit('increment');
        resolve();
      }, 1000)
    })
  }
};

export const getters = {
  evenOrOdd: state => state.value % 2 === 0 ? 'even' : 'odd'
};
