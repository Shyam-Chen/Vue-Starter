import Vue from 'vue';
import Vuex from 'vuex';

import * as counter from './counter';
import * as rest from './rest';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    counter: {
      state: { ...counter.INITIAL },
      actions: { ...counter.actions },
      mutations: { ...counter.mutations },
      getters: { ...counter.getters }
    },
    rest: {
      state: { ...rest.INITIAL },
      actions: { ...rest.actions },
      mutations: { ...rest.mutations },
      getters: { ...rest.getters }
    }
  }
});
