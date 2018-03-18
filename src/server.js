import express from 'express';
import cors from 'cors';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

/**
 * @example GET /helloWorld
 */
export const helloWorld = functions.https
  .onRequest((req, res) => {
    res.status(200).send('Hello, World!');
  });

const app = express();

app.use(cors({ origin: true }));

/**
 * @example GET /api/hello-world
 */
app.get('/hello-world', (req, res) => {
  res.status(200).send('Hello, World!');
});

export const api = functions.https.onRequest(app);
