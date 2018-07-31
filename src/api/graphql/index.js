import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { helloWorldTypeDefs, helloWorldResolvers } from './hello-world';
import { textListTypeDefs, textListResolvers } from './text-list';

const typeDefs = mergeTypes([
  helloWorldTypeDefs,
  textListTypeDefs,
], { all: true });

const resolvers = mergeResolvers([
  helloWorldResolvers,
  textListResolvers,
]);

export default new ApolloServer({ typeDefs, resolvers });
