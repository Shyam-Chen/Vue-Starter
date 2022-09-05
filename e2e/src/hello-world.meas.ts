import { Mockiavelli } from 'mockiavelli';
import responses from 'responses/auth';

describe('Auth', () => {
  let [context, page, mockiavelli] = [];

  beforeAll(async () => {
    context = await global.browser.newContext();
    page = await context.newPage();
    mockiavelli = await Mockiavelli.setup(page);

    mockiavelli.mockGET(`${global.API_URL}/api/getprefillemail`, {
      status: 200,
      body: responses.getprefillemail,
    });

    await page.goto(`${global.SITE_URL}/`);
    await page.waitForLoadState('networkidle');
  });

  it('should get a performance audit', async () => {
    const lhr = await global.audit(`${global.SITE_URL}/`);
    const score = await global.result(lhr, 'performance');
    expect(score).toBeGreaterThanOrEqual(90);
  });
});
