import Vue from 'vue';
import Apollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(Apollo);

const client = new ApolloClient({
  link: new HttpLink({ uri: `${process.env.FUNC_URL}/api/graphql` }),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
});

const apollo = new Apollo({
  defaultClient: client,
});

const provide = apollo.provide();

export default provide;
