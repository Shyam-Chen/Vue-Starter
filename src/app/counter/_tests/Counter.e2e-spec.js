describe('Counter', () => {
  beforeEach(async () => {
    return await browser.driver.get(`${browser.baseUrl}/counter`);
  });

  it('should display count', () => {
    const el = browser.driver.findElement(by.css('span.md-title'));
    expect(el.getText()).toEqual('Clicked: 0 times, value is even.');
  });
});
