import { join } from 'path';

import { SITE_URL, FUNC_URL, SITE_PORT } from '../env';

jest.setTimeout(20000);

global.SITE_URL = SITE_URL;
global.FUNC_URL = FUNC_URL;

const [width, height] = [1280, 800];

global.viewport = { width, height };

global.launch = {
  headless: false,
  slowMo: 80,
  args: [`--window-size=${width},${height}`, '--no-sandbox'],
};

if (process.env.CI_ENV) {
  // TODO: firebase functions
  const express = require('express');
  const history = require('express-history-api-fallback');

  const vm = express();
  const root = join(__dirname, '../public');

  vm.use(express.static(root));
  vm.use(history('index.html', { root }));

  vm.listen(SITE_PORT);
}
