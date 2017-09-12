import Vue from 'vue';
import material from 'vue-material';

import App from './app/App';
import store from './app/store';

Vue.use(material);

new Vue({
  el: '#app',
  store,
  render: handle => handle(App)
});
