import { SITE_URL, FUNC_URL } from '../env';

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
