import puppeteer from 'puppeteer';

describe('Basic', () => {
  let [page, browser] = [];

  let [headline] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);

    headline = '#app > div.application--wrap > main > div > div > div > div.headline';
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(`${global.SITE_URL}/crud-operations/basic`);
  });

  it('should display headline', async () => {
    const text = await page.$eval(headline, el => el.textContent);
    expect(text).toMatch('CRUD Operations - Basic');
  });

  it('should add a item', () => {

  });

  it('should search a board', () => {

  });

  it('should delete selected item', () => {

  });

  it('should edit a item', () => {

  });

  it('should delete a item', async () => {
    const deleteIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(2) > div';
    const confirm = '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button.btn.btn--flat.red--text > div';

    await page.click(deleteIcon);
    await page.click(confirm);

    const tbodyRow = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr';

    const length = await page.$$eval(tbodyRow, el => el.length);
    expect(length).toBe(3);
  });
});
