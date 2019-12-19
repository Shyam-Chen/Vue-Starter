const functions = require('firebase-functions');
const express = require('express');
const prerender = require('prerender-node');

const app = express();

app.use(prerender.set('prerenderToken', 'QYKyxDcMkqVVLNn7AREr'));

exports.app = functions.https.onRequest(app);
