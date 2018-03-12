import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import material from 'vuetify';
import reactivex from 'vue-rx';
import { Observable } from 'rxjs';
import Apollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import I18n from 'vue-i18n';

import './assets/styles/global.css';
import { App, router, store } from './app';

sync(store, router);

Vue.use(material);
Vue.use(reactivex, { Observable });
Vue.use(Apollo);
Vue.use(I18n);

const provide = new Apollo({
  defaultClient: new ApolloClient({
    link: new HttpLink({ uri: 'https://web-go-demo.herokuapp.com/__/graphql' }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  }),
}).provide();

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
  provide,
  i18n,
  render: mount => mount(App),
});

if (module.hot) {
  module.hot.accept();
}
