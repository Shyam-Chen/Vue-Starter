import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './api';

admin.initializeApp(functions.config().firebase);
dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

export const api = functions.https.onRequest(app);
