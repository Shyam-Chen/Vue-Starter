import puppeteer from 'puppeteer';

describe('Basic', () => {
  let [page, browser] = [];

  let [headline, displayRows] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);

    headline = '#basic > div > div.headline';
    displayRows = '#basic > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr';
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

  it('should add a item', async () => {
    const primaryInput = '#basic > div > div:nth-child(2) > div:nth-child(1) > div > div > div.v-input__slot > div > input[type="text"]';
    const accentInput = '#basic > div > div:nth-child(2) > div:nth-child(2) > div > div > div.v-input__slot > div > input[type="text"]';
    const addButton = '#basic > div > div:nth-child(2) > button > div';

    await page.type(primaryInput, 'foo');
    await page.type(accentInput, 'bar');
    await page.click(addButton);
    const length = await page.$$eval(displayRows, el => el.length);

    expect(length).toBe(5);
  });

  it('should search a board', async () => {
    const searchInput = '#basic > div > div:nth-child(3) > div > div.v-card__title.o-card-title > div.v-input.v-text-field.v-text-field--single-line.v-input--hide-details > div > div > div.v-text-field__slot > input[type="text"]';

    await page.type(searchInput, 'v');
    const length = await page.$$eval(displayRows, el => el.length);

    expect(length).toBe(2);
  });

  it('should delete selected item', async () => {
    const selectAllCheckbox = '#basic > div > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr:nth-child(1) > th:nth-child(1) > div > div > div > div > div';
    const deleteSelectedIconButton = '#basic > div > div:nth-child(3) > div > div.v-card__title.o-card-title > button > div > i';

    await page.click(selectAllCheckbox);
    await page.click(deleteSelectedIconButton);
    const length = await page.$$eval(displayRows, el => el.length);

    expect(length).toBe(1);
  });

  it('should edit a item', async () => {
    const firstEditIconButton = '#basic > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(1) > div > i';
    const dialogPrimaryInput = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div:nth-child(1) > div > div > div.v-input__slot > div > input[type="text"]';
    const saveButton = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.v-btn--flat.success--text > div';
    const firstPrimaryText = '#basic > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';

    await page.click(firstEditIconButton);
    await page.type(dialogPrimaryInput, ' foo');
    await page.click(saveButton);
    const text = await page.$eval(firstPrimaryText, el => el.textContent);

    expect(text).toBe('Vanilla foo');
  });

  it('should delete a item', async () => {
    const firstDeleteIconButton = '#basic > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(2) > div > i';
    const confirmButton = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.v-btn--flat.error--text > div';

    await page.click(firstDeleteIconButton);
    await page.click(confirmButton);
    const length = await page.$$eval(displayRows, el => el.length);

    expect(length).toBe(3);
  });
});
