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
 *
 * mutation {
 *   addText("${text}") {
 *     id
 *     text
 *   }
 * }
 */

export const textListTypeDefs = gql`
  type TextList {
    id: ID!
    text: String!
    # message: String!
  }

  type Query {
    textList: [TextList]
  }

  type Mutation {
    addText(text: String!): TextList
    # updateText(_id: ID!, text: String!): TextList
    # deleteText(_id: ID!): TextList
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
  Mutation: {
    async addText(root, { text }) {
      const coll = admin.firestore().collection('text-list');

      const message = await coll.add({ text })
        .then(() => 'Data saved.');

      console.log(message);

      return null;
    },
  },
};
