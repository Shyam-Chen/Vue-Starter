import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Material from 'vuetify';
import ReactiveX from 'vue-rx';
import { Observable } from 'rxjs';

import './assets/styles/global.css';
import { App, router, store, provide, i18n } from './app';

sync(store, router);

Vue.use(Material);
Vue.use(ReactiveX, { Observable });

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  router,
  store,
  provide,
  i18n,
  render: mount => mount(App),
});

if (module.hot) {
  module.hot.accept();
}
