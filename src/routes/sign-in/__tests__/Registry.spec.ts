import { test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import responses from 'responses/auth';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

vi.mock('~/utilities/request');

test('Sign-in', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn((url) => {
    if (url === '/auth/sign-in') {
      return {
        _data: responses['post_/sign-in'],
        status: 200,
      };
    }

    return {};
  }) as any;

  const wrapper = render(Registry, { global: { plugins: [router, localer] } });
  const push = vi.spyOn(router, 'push');
  await router.isReady();
  await fireEvent.click(wrapper.getByText('Sign In'));

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});

test('Sign-in - failed', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn((url) => {
    if (url === '/auth/sign-in') {
      return {
        _data: responses['post_/sign-in_error'],
        status: 400,
      };
    }

    return {};
  }) as any;

  const wrapper = render(Registry, { global: { plugins: [router, localer] } });
  await fireEvent.click(wrapper.getByText('Sign In'));

  expect(wrapper.html()).toMatch('Wrong password. Try again or click Forgot password to reset it.');
});
