import express from 'express';
import cors from 'cors';

import routes from './api';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(cors({ origin: true }));

app.use('/', routes);

export const api = functions.https.onRequest(app);
