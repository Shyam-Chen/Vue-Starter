import Vue from 'vue';
import Vuex from 'vuex';

import { counter } from './counter';
import { rest } from './rest';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    counter,
    rest
  }
});
