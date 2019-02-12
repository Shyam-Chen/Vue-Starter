import 'vuetify/dist/vuetify.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Material from 'vuetify';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import { register } from 'register-service-worker';

import './assets/styles/global.css';
import App from './app/App';
import router from './app/core/router';
import store from './app/core/store';
import apolloProvider from './app/core/apollo-provider';
import i18n from './app/core/i18n';

sync(store, router);

Vue.use(Material, {
  theme: {
    primary: '#1E88E5',  // blue, darken-1
    secondary: '#42A5F5',  // blue, lighten-1
    accent: '#E91E63',  // pink
  },
});

firebase.initializeApp(process.env.FIREBASE_CONFIG);

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_DSN)
    .addPlugin(RavenVue, Vue)
    .install();

  register('/service-worker.js', {
    registrationOptions: { scope: './' },
    ready() {
      console.log('Service worker is active.');
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      console.log('New content is available; please refresh.');
      window.location.reload();
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}

const vm = new Vue({
  router,
  store,
  apolloProvider,
  i18n,
  render: handle => handle(App),
});

vm.$mount('#app');

if (module.hot) {
  module.hot.accept();
}
