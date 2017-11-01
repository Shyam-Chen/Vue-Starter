import Vue from 'vue';
import router from 'vue-router';

import { Counter } from '~/counter';
import { REST } from '~/rest';
import { GraphQL } from '~/graphql';
import { FormControls } from '~/form-controls';
import { NotFound } from '~/not-found';

import App from './App';

Vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/counter', component: Counter },
    { path: '/rest', component: REST },
    { path: '/graphql', component: GraphQL },
    { path: '/form-controls', component: FormControls },
    { path: '*', component: NotFound }
  ]
});
