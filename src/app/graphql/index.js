import GraphQL from './GraphQL';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const graphql = { state, actions, mutations, getters };

export { GraphQL, graphql };
