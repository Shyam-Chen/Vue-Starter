import puppeteer from 'puppeteer';

import { SITE_URL } from '../../../../../env';

jest.setTimeout(20000);

describe('Counter', () => {
  let [page, browser] = [];

  let [headline] = [];
  let [increment] = [];

  beforeAll(async () => {
    const [width, height] = [1280, 800];

    const launch = {
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`, '--no-sandbox'],
    };

    browser = await puppeteer.launch(launch);
    page = await browser.newPage();
    await page.setViewport({ width, height });

    headline = '#app > div > main > div > div > div > div > div > div:nth-child(1) > div';
    increment = '#app > div > main > div > div > div > div > div > div:nth-child(2) > button:nth-child(1) > div';
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(`${SITE_URL}/counter`);
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
