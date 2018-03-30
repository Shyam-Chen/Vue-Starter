import gql from 'graphql-tag';

export const textListTypeDefs = gql`
  type TextList {
    id: ID!
    text: String!
  }

  type Query {
    textList: [TextList]
  }
`;

export const textListResolvers = {
  Query: {
    textList() {
      return [
        { id: 1, text: 'foo' },
        { id: 2, text: 'bar' },
      ];
    },
  },
};
