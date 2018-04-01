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
    const primaryInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div.input-group__input > input[type="text"]';
    const accentInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div.input-group__input > input[type="text"]';
    const addButton = '#app > div.application--wrap > main > div > div > div > div:nth-child(2) > button > div';

    await page.type(primaryInput, 'foo');
    await page.type(accentInput, 'bar');
    await page.click(addButton);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(5);
  });

  it('should search a board', async () => {
    const searchInput = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div.card__title.vfs-card-title > div.input-group.input-group--append-icon.input-group--hide-details.input-group--text-field.input-group--single-line.primary--text > div.input-group__input > input[type="text"]';

    await page.type(searchInput, 'v');
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(2);
  });

  it('should delete selected item', async () => {
    const selectAll = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > thead > tr:nth-child(1) > th:nth-child(1) > div > div.input-group__input > div';
    const deleteIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div.card__title.pink.lighten-4.vfs-card-title > button > div';

    await page.click(selectAll);
    await page.click(deleteIcon);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(1);
  });

  it('should edit a item', async () => {
    const firstEditIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(1) > div';
    const primaryInput = '#app > div.dialog__content.dialog__content__active > div > div > div.card__text > div > div:nth-child(1) > div > div.input-group__input > input[type="text"]';
    const saveButton = '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button.btn.btn--flat.green--text > div';
    const firstPrimary = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';

    await page.click(firstEditIcon);
    await page.type(primaryInput, ' foo');
    await page.click(saveButton);
    const text = await page.$eval(firstPrimary, el => el.textContent);

    expect(text).toBe('Vanilla foo');
  });

  it('should delete a item', async () => {
    const firstDeleteIcon = '#app > div.application--wrap > main > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.text-xs-right > button:nth-child(2) > div';
    const confirm = '#app > div.dialog__content.dialog__content__active > div > div > div.card__actions > button.btn.btn--flat.red--text > div';

    await page.click(firstDeleteIcon);
    await page.click(confirm);
    const length = await page.$$eval(displayRow, el => el.length);

    expect(length).toBe(3);
  });
});
