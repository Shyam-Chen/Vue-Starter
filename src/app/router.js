import Vue from 'vue';
import router from 'vue-router';

import { Counter } from './counter';
import { REST } from './rest';

Vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    { path: '/counter', component: Counter },
    { path: '/rest', component: REST }
  ]
});
