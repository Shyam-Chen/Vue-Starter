import Vue from 'vue';
import router from 'vue-router';

import { Welcome } from './welcome';
import { Counter } from './counter';
import { REST } from './rest';
import { NotFound } from './not-found';

Vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    { path: '/', component: Welcome },
    { path: '/counter', component: Counter },
    { path: '/rest', component: REST },
    { path: '*', component: NotFound }
  ]
});
