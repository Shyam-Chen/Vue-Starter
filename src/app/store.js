import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as counter from './counter';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    counter: {
      state: { ...counter.INITIAL },
      mutations: { ...counter.mutations },
      actions: { ...counter.actions },
      getters: { ...counter.getters }
    }
  }
});
