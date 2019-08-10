import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import { register } from 'register-service-worker';

import './assets/styles/global.css';
import App from './App';
import router from './core/router';
import store from './core/store';
import vuetify from './core/vuetify';
import apolloProvider from './core/apollo-provider';
import i18n from './core/i18n';

sync(store, router);

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
  vuetify,
  apolloProvider,
  i18n,
  render: handle => handle(App),
});

vm.$mount('#app');

if (module.hot) {
  module.hot.accept();
}
