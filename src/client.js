import 'vuetify/dist/vuetify.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Material from 'vuetify';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import './assets/styles/global.css';
import App from './app/App';
import router from './app/core/router';
import store from './app/core/store';
import provide from './app/core/provide';
import i18n from './app/core/i18n';

sync(store, router);

Vue.use(Material, {
  theme: {
    primary: '#1E88E5',  // blue, darken-1
    secondary: '#42A5F5',  // blue, lighten-1
    accent: '#E91E63',  // pink
  },
});

// firebase.initializeApp(process.env.FIREBASE_CONFIG);

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
