import Vue from 'vue';

import App from './components/App.vue';

import store from './root';

new Vue({
  el: '#app',
  store,
  render: handle => handle(App)
});
