import { SITE_URL } from '../env';

jest.setTimeout(10 * 1000);

global.SITE_URL = SITE_URL;

global.launch = { headless: false, slowMo: 80, args: ['--no-sandbox'] };

global.mobileViewport = { width: 414, height: 736 };
global.desktopViewport = { width: 1366, height: 768 };
