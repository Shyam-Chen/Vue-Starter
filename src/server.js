// import { readFileSync } from 'fs';
// import { join } from 'path';
// import { URL, format } from 'url';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import request from 'request';
// import Raven from 'raven';

import routes from './api';
import schema from './api/graphql';

// const isLocalhost = new URL(process.env.FUNC_URL).hostname === 'localhost'

admin.initializeApp();

// if (!isLocalhost) {
//   Raven.config(SENTRY_DSN).install();
// }

const vm = express();

// if (!isLocalhost) {
//   vm.use(Raven.requestHandler());
// }

vm.use(compression());
vm.use(cors({ origin: true }));
vm.use(morgan('tiny'));
vm.use(bodyParser.json());
vm.use(bodyParser.urlencoded({ extended: false }));

vm.use('/', routes);
vm.use('/graphql', graphqlExpress({ schema }));

// if (!isLocalhost) {
//   vm.use(Raven.errorHandler());
// }

export const api = functions.https.onRequest(vm);

// -

const sh = express();

sh.get('*', (req, res) => {
  const botUserAgents = [
    'W3C_Validator',
    'baiduspider',
    'bingbot',
    'embedly',
    'facebookexternalhit',
    'linkedinbot',
    'outbrain',
    'pinterest',
    'quora link preview',
    'rogerbot',
    'showyoubot',
    'slackbot',
    'twitterbot',
    'vkShare',
  ];

  const rendertronUrl = `https://${process.env.PROJECT_NAME}.appspot.com`;
  const targetUrl = process.env.SITE_URL + req.originalUrl;

  if (new RegExp(botUserAgents.join('|'), 'i').test(req.headers['user-agent'])) {
    request(`${rendertronUrl}/render/${targetUrl}`, (error, response, body) => {
      res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.set('Vary', 'User-Agent');

      res.send(`${body}`);
    });
  } else {
    request(process.env.SITE_URL, (error, response, body) => {
      res.send(`${body}`);
    });
  }
});

export const app = functions.https.onRequest(sh);
