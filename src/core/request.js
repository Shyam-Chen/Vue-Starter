import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

const authorization = `Bearer ${localStorage.getItem('token')}`;

const restClient = axios.create({
  baseURL: process.env.FUNC_URL,
});

restClient.defaults.headers.common.Authorization = authorization;

const graphqlClient = new GraphQLClient(`${process.env.FUNC_URL}/graphql`, {
  headers: {
    Authorization: authorization,
  },
});

export default {
  restClient,
  graphqlClient,
};
