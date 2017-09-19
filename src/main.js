import Vue from 'vue';
import material from 'vue-material';

import App from './app/App';
import router from './app/router';
import store from './app/store';

Vue.use(material);

new Vue({
  el: '#app',
  router,
  store,
  render: handle => handle(App)
});
