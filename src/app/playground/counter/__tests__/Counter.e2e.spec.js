import puppeteer from 'puppeteer';

import server from '~/e2e';

describe('Counter', () => {
  let [page, browser] = [];

  let [headline] = [];
  let [increment] = [];

  beforeAll(async () => {
    const [width, height] = [1280, 800];

    const launch = {
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`, '--no-sandbox']
    };

    await server;
    browser = await puppeteer.launch(launch);
    page = await browser.newPage();
    await page.setViewport({ width, height });

    headline = '#app > div > main > div > div > div > div:nth-child(1) > div';
    increment = '#app > div > main > div > div > div > div:nth-child(2) > button:nth-child(1) > div';
  });

  afterAll(async () => {
    await browser.close();
    await server.close();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:3000/counter');
  });

  it('should display count', async () => {
    const text = await page.$eval(headline, el => el.textContent);
    expect(text).toMatch('Clicked: 0 times, value is even.');
  });

  it('should click increment button', async () => {
    await page.click(increment);
    const text = await page.$eval(headline, el => el.textContent);
    expect(text).toMatch('Clicked: 1 times, value is odd.');
  });
});
