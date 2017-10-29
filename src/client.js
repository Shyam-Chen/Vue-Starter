import Vue from 'vue';
import material from 'vue-material';
import reactivex from 'vue-rx';
import { Observable } from 'rxjs';

import router from './app/router';
import store from './app/store';

Vue.use(material);
Vue.use(reactivex, { Observable });

new Vue({
  el: '#app',
  router,
  store,
  render: create => create('router-view')
});
