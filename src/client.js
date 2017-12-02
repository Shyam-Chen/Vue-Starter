import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import material from 'vue-material';
import reactivex from 'vue-rx';
import { Observable } from 'rxjs';
// import Apollo from 'vue-apollo';
// import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import I18n from 'vue-i18n';

import { router, store } from './app';

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
  locale: 'en-US',
  messages: {
    'en-US': {}
  }
});

new Vue({
  el: '#app',
  router,
  store,
  // apolloProvider,
  i18n,
  render: mount => mount('router-view')
});

if (module.hot) {
  module.hot.accept();
}
