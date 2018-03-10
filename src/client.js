import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import material from 'vuetify';
import reactivex from 'vue-rx';
import { Observable } from 'rxjs';
// import Apollo from 'vue-apollo';
// import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import I18n from 'vue-i18n';

import './assets/styles/global.css';
import { App, router, store } from './app';

sync(store, router);

Vue.use(material);
Vue.use(reactivex, { Observable });
// Vue.use(Apollo);
Vue.use(I18n);

// const client = new ApolloClient({
//   networkInterface: createBatchingNetworkInterface({
//     uri: 'https://web-go-demo.herokuapp.com/__/graphql'
//   })
// });

// const apolloProvider = new Apollo({
//   defaultClient: client
// });

const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
    },
    zh: {
      message: {
        hello: '你好，世界',
      },
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
      },
    },
  },
});

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  router,
  store,
  // apolloProvider,
  i18n,
  render: mount => mount(App),
});

if (module.hot) {
  module.hot.accept();
}
