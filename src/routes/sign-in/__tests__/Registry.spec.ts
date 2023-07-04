import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import responses from 'responses/auth';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(Registry, { global: { plugins: [router, localer] } });
});

afterEach(() => {
  wrapper.unmount();
});

vi.mock('~/utilities/request');

test('Sign-in', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>((url) => {
    if (url === '/auth/sign-in') {
      return { _data: responses['post_/sign-in'], status: 200 };
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

test('Sign-in - failed', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>((url) => {
    if (url === '/auth/sign-in') {
      return { _data: responses['post_/sign-in_error'], status: 400 };
    }
  });

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(wrapper.html()).toMatch('Wrong password. Try again or click Forgot password to reset it.');
});

test('Sign-in - 2fa', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>((url) => {
    if (url === '/auth/sign-in') {
      return { _data: responses['post_/sign-in_2fa'], status: 200 };
    }

    if (url === '/auth/otp/validate') {
      return { _data: responses['post_/auth/otp/validate'], status: 200 };
    }
  });

  const push = vi.spyOn(router, 'push');
  await router.isReady();

  wrapper.get('[data-testid="username"]').setValue('deno.land');
  wrapper.get('[data-testid="password"]').setValue('qwerty123');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(wrapper.html()).toMatch('Two-factor Authentication');

  await wrapper.get('[data-testid="code"]').setValue('123456');

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});
