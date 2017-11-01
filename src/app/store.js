import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { counter } from '~/counter';
import { rest } from '~/rest';
import { graphql } from '~/graphql';
import { formControls } from '~/form-controls';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    counter,
    rest,
    graphql,
    formControls
  },
  plugins: [
    createLogger({ collapsed: false })
  ]
});
