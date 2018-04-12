import puppeteer from 'puppeteer';

describe('Counter', () => {
  let [page, browser] = [];

  let [headline] = [];
  let [increment] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);

    headline = '#app > div.application--wrap > main > div > div > div > div:nth-child(1) > div';
    increment = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > button:nth-child(1) > div';
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(`${global.SITE_URL}/counter`);
  });

  it('should display count', async () => {
    const text = await page.$eval(headline, el => el.textContent);
    const string = 'Clicked: 0 times, value is even.';

    expect(text.trim()).toMatch(string);
  });

  it('should click increment button', async () => {
    await page.click(increment);
    const text = await page.$eval(headline, el => el.textContent);
    const string = 'Clicked: 1 times, value is odd.';

    expect(text.trim()).toMatch(string);
  });
});
