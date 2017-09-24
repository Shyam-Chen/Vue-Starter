import Vue from 'vue';
import router from 'vue-router';

import { App } from './App';
import { Counter } from './counter';
import { REST } from './rest';
import { NotFound } from './not-found';

Vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/counter', component: Counter },
    { path: '/rest', component: REST },
    { path: '*', component: NotFound }
  ]
});
