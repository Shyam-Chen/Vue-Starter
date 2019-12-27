import puppeteer from 'puppeteer';

describe('HelloWorld', () => {
  let [page, browser] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(`${process.env.SITE_URL}/en/hello-world`);
  });

  it('should display a text', async () => {
    const selector = '#hello-world > div > div';
    const text = await page.$eval(selector, el => el.textContent);
    expect(text).toMatch('Hello, World!');
  });
});
