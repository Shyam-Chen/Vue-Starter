import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { rest } from '~/crud-operations/rest';
import { graphql } from '~/crud-operations/graphql';
import { formControls } from '~/form-controls';
import { counter } from '~/playground/counter';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    rest,
    graphql,
    formControls,
    counter,
  },
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});

export default store;
