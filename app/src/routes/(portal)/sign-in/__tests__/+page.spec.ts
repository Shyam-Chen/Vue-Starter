import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import * as xui from '@x/ui';
import opt from 'mock/auth/otp/validate/response';
import signIn from 'mock/auth/sign-in/response';

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import Page from '../+page.vue';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(Page, { global: { plugins: [router, localer] } });
});

afterEach(() => {
  wrapper.unmount();
});

test('successful', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url): any => {
    if (url === '/auth/sign-in') {
      return { _data: signIn.successful, status: 200 };
    }
  });

  const push = vi.spyOn(router, 'push');
  await router.isReady();

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});

test('failed', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url): any => {
    if (url === '/auth/sign-in') {
      return { _data: signIn.failed, status: 400 };
    }
  });

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(wrapper.html()).toMatch('Wrong password. Try again or click Forgot password to reset it.');
});

test('2fa', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url): any => {
    if (url === '/auth/sign-in') {
      return { _data: signIn.successful_hasMFA, status: 200 };
    }

    if (url === '/auth/otp/validate') {
      return { _data: opt.successful, status: 200 };
    }
  });

  const push = vi.spyOn(router, 'push');
  await router.isReady();

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(wrapper.html()).toMatch('Multi-factor Authentication');

  await wrapper.get('[data-testid="code"]').setValue('123456');

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});

test('2fa_unverified', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url): any => {
    if (url === '/auth/sign-in') {
      return { _data: signIn.successful_hasMFA_unverified, status: 200 };
    }
  });

  const push = vi.spyOn(router, 'push');
  await router.isReady();

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/two-factor-auth');
});
