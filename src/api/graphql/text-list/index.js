import gql from 'graphql-tag';

export const textListTypeDefs = gql`
  type TextList {
    id: ID!
    text: String!
  }

  type Query {
    textList: [TextList]
    list(id: String, text: String): [TextList]
  }
`;

export const textListResolvers = {
  Query: {

  },
  Mutation: {

  },
};
