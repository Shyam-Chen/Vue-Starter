
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

    mockiavelli.mockPOST(`https://www.google.com/recaptcha/api2/reload`, {
      status: 200,
      body: {},
    });

    mockiavelli.mockGET(`https://api64.ipify.org`, {
      status: 200,
      body: {},
    });

    mockiavelli.mockGET(`https://dataservice.tmok.tm/tc.png`, {
      status: 200,
      body: {},
    });

    mockiavelli.mockPOST(`${global.API_URL}/api/usersigninauth`, {
      status: 200,
      body: responses.usersigninauth,
    });

    mockiavelli.mockPOST(`${global.API_URL}/api/mfasendcode`, {
      status: 200,
      body: {},
    });

    await page.goto(`${global.SITE_URL}/`);
    await page.waitForLoadState('networkidle');
  });

  it('should get Sign In', async () => {
    const signInBtn = '#sign-in';
    const text = await page.$eval(signInBtn, el => el.textContent);
    expect(text).toMatch('Sign In');
  });

  it('should get Two-factor Authentication', async () => {
    const emailInput = '#email';
    const passwordInput = '#password';
    const signInBtn = '#sign-in';

    await page.fill(emailInput, 'foo.bar@gmail.com');
    await page.fill(passwordInput, '12345678');
    await page.click(signInBtn);

    const twoFactorAuth = '#two-factor-auth';
    await page.waitForSelector(twoFactorAuth);
    const twoFactorAuthText = await page.$eval(twoFactorAuth, el => el.textContent);
    expect(twoFactorAuthText).toMatch('Two-factor Authentication');
  });
});
