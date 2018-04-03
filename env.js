/* eslint-disable no-unused-vars, no-multi-assign */

const NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';

const SITE_PORT = exports.SITE_PORT = process.env.SITE_PORT || 8000;
const SITE_URL = exports.SITE_URL = process.env.SITE_URL || `http://localhost:${SITE_PORT}`;

const FUNC_PROJECT = exports.FUNC_PROJECT = process.env.FUNC_PROJECT || 'vue-by-example-dev';
const FUNC_URL = exports.FUNC_URL = process.env.FUNC_URL || `http://localhost:5000/${FUNC_PROJECT}/us-central1`;
