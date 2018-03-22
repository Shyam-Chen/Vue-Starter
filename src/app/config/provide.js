import Vue from 'vue';
import Apollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(Apollo);

const provide = new Apollo({
  defaultClient: new ApolloClient({
    link: new HttpLink({ uri: `${process.env.API_URL}/__/graphql` }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  }),
}).provide();

export default provide;
