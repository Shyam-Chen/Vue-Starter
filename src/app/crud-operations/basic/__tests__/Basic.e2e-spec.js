import puppeteer from 'puppeteer';

describe('Basic', () => {
  let [page, browser] = [];

  let [headline, displayRow] = [];

  beforeAll(async () => {
    browser = await puppeteer.launch(global.launch);
    page = await browser.newPage();
    await page.setViewport(global.viewport);

    headline = '#app > div.application--wrap > main > div > div > div > div.headline';
    displayRow = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr';
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
    const primaryInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div.v-input__slot > div > input[type="text"]';
    const accentInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div.v-input__slot > div > input[type="text"]';
    const addButton = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > button > div';

    await page.type(primaryInput, 'foo');
    await page.type(accentInput, 'bar');
    await page.click(addButton);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(5);
  });

  it('should search a board', async () => {
    const searchInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div.v-card__title.o-card-title > div.v-input.v-text-field.v-text-field--single-line.v-input--hide-details > div > div.v-input__slot > div.v-text-field__slot > input[type="text"]';

    await page.type(searchInput, 'v');
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(2);
  });

  it('should delete selected item', async () => {
    const selectAllCheckbox = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr:nth-child(1) > th:nth-child(1) > div > div > div > div > div';
    const deleteCheckedIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div.v-card__title.o-card-title > button > div > i';

    await page.click(selectAllCheckbox);
    await page.click(deleteCheckedIcon);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(1);
  });

  it('should edit a item', async () => {
    const firstEditIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(1) > div > i';
    const primaryInput = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div:nth-child(1) > div > div > div.v-input__slot > div > input[type="text"]';
    const saveButton = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.v-btn--flat.success--text > div';
    const firstPrimaryText = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';

    await page.click(firstEditIcon);
    await page.type(primaryInput, ' foo');
    await page.click(saveButton);
    const text = await page.$eval(firstPrimaryText, el => el.textContent);

    expect(text).toBe('Vanilla foo');
  });

  it('should delete a item', async () => {
    const firstDeleteIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(2) > div > i';
    const confirmButton = '#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button.v-btn.v-btn--flat.error--text > div';

    await page.click(firstDeleteIcon);
    await page.click(confirmButton);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(3);
  });
});
