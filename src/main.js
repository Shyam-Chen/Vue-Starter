import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { sync } from 'vuex-router-sync';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import '~/assets/styles/global.css';
import router from '~/core/router';
import store from '~/core/store';
import vuetify from '~/core/vuetify';
import apolloProvider from '~/core/apollo-provider';
import i18n from '~/core/i18n';
import registerServiceWorker from '~/core/service-worker';

Vue.use(VueCompositionApi);

sync(store, router);

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_DSN)
    .addPlugin(RavenVue, Vue)
    .install();
}

const vm = new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  i18n,
  render: (handle) => handle('router-view'),
});

vm.$mount('#app');

registerServiceWorker();
