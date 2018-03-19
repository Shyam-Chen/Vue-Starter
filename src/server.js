import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

import routes from './api';

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(cors({ origin: true }));

app.use('/', routes);

export const api = functions.https.onRequest(app);
