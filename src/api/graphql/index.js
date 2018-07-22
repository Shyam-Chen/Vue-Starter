import { makeExecutableSchema } from 'graphql-tools';
// import { ApolloServer } from 'apollo-server-express';
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

export default makeExecutableSchema({ typeDefs, resolvers });
// export default new ApolloServer({ typeDefs, resolvers });
