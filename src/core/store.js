import Vue from 'vue';
import Vuex from 'vuex';

import { INITIAL as state } from '../constants';
import actions from '../actions';
import getters from '../getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  getters,
});

export default store;
