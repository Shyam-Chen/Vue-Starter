import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { INITIAL as state } from '../constants';
import actions from '../actions';
import getters from '../getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  getters,
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});

export default store;
