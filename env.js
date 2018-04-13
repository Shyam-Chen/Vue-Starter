/* eslint-disable no-unused-vars, no-multi-assign */

const NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';

const PROJECT_NAME = exports.PROJECT_NAME = process.env.PROJECT_NAME || 'vue-by-example-dev';

const SITE_PORT = exports.SITE_PORT = process.env.SITE_PORT || 8000;
const SITE_URL = exports.SITE_URL = process.env.SITE_URL || `http://localhost:${SITE_PORT}`;

const FUNC_PORT = exports.FUNC_PORT = process.env.FUNC_PORT || 5000;
const FUNC_URL = exports.FUNC_URL = process.env.FUNC_URL || `http://localhost:${FUNC_PORT}/${PROJECT_NAME}/us-central1`;
