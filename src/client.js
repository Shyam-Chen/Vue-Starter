import 'vuetify/dist/vuetify.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Material from 'vuetify';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import './assets/styles/global.css';
import App from './app/App';
import router from './app/config/router';
import store from './app/config/store';
import provide from './app/config/provide';
import i18n from './app/config/i18n';

sync(store, router);

Vue.use(Material, {
  theme: {
    primary: '#1E88E5',  // blue, darken-1
    secondary: '#42A5F5',  // blue, lighten-1
    accent: '#E91E63',  // pink
    error: '#F44336',  // red
    warning: '#FFEB3B',  // yellow
    info: '#2196F3',  // blue
    success: '#4CAF50',  // green
  },
});

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_DSN)
    .addPlugin(RavenVue, Vue)
    .install();
}

const vm = new Vue({
  router,
  store,
  provide,
  i18n,
  render: handle => handle(App),
});

vm.$mount('#app');

if (module.hot) {
  module.hot.accept();
}
