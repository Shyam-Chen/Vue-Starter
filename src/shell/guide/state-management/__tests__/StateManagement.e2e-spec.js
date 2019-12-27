import puppeteer from 'puppeteer';

describe('StateManagement', () => {
  let [page, browser] = [];

  let [headline] = [];
  let [increment] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);

    headline = '#state-management > div > div:nth-child(1) > div';
    increment = '#state-management > div > div:nth-child(3) > button:nth-child(1)';
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(`${process.env.SITE_URL}/en/guide/state-management`);
  });

  it('should display a text', async () => {
    const text = await page.$eval(headline, el => el.textContent);
    const string = 'Clicked: 0 times, value is even.';

    expect(text.trim()).toMatch(string);
  });

  it('should click the increment button', async () => {
    await page.click(increment);
    const text = await page.$eval(headline, el => el.textContent);
    const string = 'Clicked: 1 times, value is odd.';

    expect(text.trim()).toMatch(string);
  });
});
