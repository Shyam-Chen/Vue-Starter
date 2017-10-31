import Vue from 'vue';
import material from 'vue-material';
import reactivex from 'vue-rx';
import { Observable } from 'rxjs';
// import Apollo from 'vue-apollo';
// import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';

import { router, store } from './app';

Vue.use(material);
Vue.use(reactivex, { Observable });
// Vue.use(Apollo);

// const client = new ApolloClient({
//   networkInterface: createBatchingNetworkInterface({
//     uri: 'https://web-go-demo.herokuapp.com/__/graphql'
//   })
// });

// const apolloProvider = new Apollo({
//   defaultClient: client
// });

new Vue({
  el: '#app',
  router,
  store,
  // apolloProvider,
  render: create => create('router-view')
});
