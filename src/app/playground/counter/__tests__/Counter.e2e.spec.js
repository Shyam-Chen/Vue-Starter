import puppeteer from 'puppeteer';

import server from '~/e2e';

describe('Counter', () => {
  let [page, browser] = [];

  beforeAll(async () => {
    const width = 1280;
    const height = 800;

    const launch = {
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`, '--no-sandbox']
    };

    await server;
    browser = await puppeteer.launch(launch);
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async () => {
    await browser.close();
    await server.close();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:3000/counter');
  });

  it('should display count', async () => {
    const text = await page.$eval('#app > div.application--wrap > main > div > div > div > div.title', el => el.textContent);
    expect(text).toMatch('Clicked: 0 times, value is even.');
  });

  it('should click increment button', async () => {
    await page.click('#app > div.application--wrap > main > div > div > div > div:nth-child(2) > button:nth-child(1) > div');
    const text = await page.$eval('#app > div.application--wrap > main > div > div > div > div.title', el => el.textContent);
    expect(text).toMatch('Clicked: 1 times, value is odd.');
  });
});
