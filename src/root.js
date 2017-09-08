import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { state, getters, actions, mutations } from './app/counter';

// export default new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
// })

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    counter: {
      // namespaced: true,
      state: { ...state },
      mutations: { ...mutations },
      actions: { ...actions },
      getters: { ...getters }
    }
  }
});
