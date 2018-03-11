import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable';

import { rest } from '~/crud-operations/rest';
import { graphql } from '~/crud-operations/graphql';
import { formControls } from '~/form-controls';

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
  },
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});

/** @name playground */
Observable
  ::forkJoin(
    import('~/playground/counter'),
  )
  .subscribe((result) => {
    store.registerModule('counter', result[0].counter);
  });

export default store;
