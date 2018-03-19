const functions = require('firebase-functions');

/**
 * @example GET /helloWorld
 */
export const helloWorld = functions.https
  .onRequest((req, res) => {
    res.status(200).send('Hello, World!');
  });
