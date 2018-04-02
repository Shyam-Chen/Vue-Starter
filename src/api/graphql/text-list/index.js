import gql from 'graphql-tag';
import * as admin from 'firebase-admin';

/**
 * @name Query
 * @example
 * {
 *   textList {
 *     id
 *     text
 *   }
 * }
 */

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
    async textList() {
      const data = [];
      const coll = admin.firestore().collection('text-list');

      const snapshot = await coll.get();

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data;
    },
  },
};
