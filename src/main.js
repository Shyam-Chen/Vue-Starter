import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { sync } from 'vuex-router-sync';

import '~/assets/styles/global.css';
import router from '~/core/router';
import store from '~/core/store';
import vuetify from '~/core/vuetify';
import apolloProvider from '~/core/apollo-provider';
import i18n from '~/core/i18n';
import register from '~/core/register';

import App from './App';

Vue.use(VueCompositionApi);

sync(store, router);

const vm = new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  i18n,
  render: h => h(App),
});

vm.$mount('#root');

register();
