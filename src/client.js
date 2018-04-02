import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Material from 'vuetify';
import Meta from 'vue-meta';
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';

import './assets/styles/global.css';
import App from './app/App';
import router from './app/config/router';
import store from './app/config/store';
import provide from './app/config/provide';
import i18n from './app/config/i18n';

sync(store, router);

Vue.use(Material);
Vue.use(Meta);

// if (window.location.hostname !== 'localhost') {
//   Raven.config('https://<key>@sentry.io/<project>')
//     .addPlugin(RavenVue, Vue)
//     .install();
// }

const vm = new Vue({
  router,
  store,
  provide,
  i18n,
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
  render: handle => handle(App),
});

vm.$mount('#app');

if (module.hot) {
  module.hot.accept();
}
