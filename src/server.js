import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import request from 'request';
import Raven from 'raven';

import routes from './api';
import apolloServer from './api/graphql';

admin.initializeApp();

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_DSN).install();
}

const vm = express();

if (process.env.NODE_ENV === 'production') {
  vm.use(Raven.requestHandler());
}

vm.use(compression());
vm.use(cors({ origin: true }));
vm.use(morgan('tiny'));
vm.use(bodyParser.json());
vm.use(bodyParser.urlencoded({ extended: false }));

/**
 * @name REST
 */
vm.use('/', routes);

/**
 * @name GraphQL
 */
apolloServer.applyMiddleware({ app: vm });

if (process.env.NODE_ENV === 'production') {
  vm.use(Raven.errorHandler());
}

export const api = functions.https.onRequest(vm);

// -

const sh = express();

sh.get('*', (req, res) => {
  const botUserAgents = [
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
    'TelegramBot',
    'twitterbot',
    'vkShare',
    'W3C_Validator',
    'whatsapp',
  ];

  const rendertronUrl = process.env.RENDERTRON_URL;
  const targetUrl = process.env.SITE_URL + req.originalUrl;

  if (new RegExp(botUserAgents.join('|'), 'i').test(req.headers['user-agent'])) {
    request(`${rendertronUrl}/render/${targetUrl}`, (error, response, body) => {
      res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.set('Vary', 'User-Agent');

      res.send(String(body));
    });
  } else {
    request(process.env.SITE_URL, (error, response, body) => {
      res.send(String(body));
    });
  }
});

export const app = functions.https.onRequest(sh);
