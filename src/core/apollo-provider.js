import Vue from 'vue';
import Apollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(Apollo);

const apolloClient = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`,
});

const apolloProvider = new Apollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
