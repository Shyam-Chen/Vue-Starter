import gql from 'graphql-tag';

export const helloWorldTypeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

export const helloWorldResolvers = {
  Query: {

  },
};
