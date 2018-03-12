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
    formControls,
  },
  plugins: [
    process.env.NODE_ENV === 'development' && createLogger({ collapsed: false }),
  ].filter(Boolean),
});

/** @name crud-operations */
Observable
  ::forkJoin(
    import('~/crud-operations/basic'),
    import('~/crud-operations/rest'),
    import('~/crud-operations/graphql'),
  )
  .subscribe((result) => {
    store.registerModule('basic', result[0].basic);
    store.registerModule('rest', result[1].rest);
    store.registerModule('graphql', result[2].graphql);
  });

/** @name form-controls */
Observable
  ::forkJoin(
    import('~/form-controls'),
  )
  .subscribe((result) => {
    store.registerModule('formControls', result[0].formControls);
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
