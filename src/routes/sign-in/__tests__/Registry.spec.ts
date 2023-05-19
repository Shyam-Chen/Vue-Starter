import { test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import responses from '../../../../mock/responses/auth';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

test('Sign-in', async () => {
  vi.mock('@vueuse/core', () => {
    return {
      createFetch: vi.fn(() => () => ({
        json: () => ({
          post: () => ({ execute: () => ({}) }),
          data: { value: responses['post_/sign-in'] },
          statusCode: { value: 200 },
        }),
      })),
    };
  });

  const wrapper = render(Registry, { global: { plugins: [router, localer] } });
  const push = vi.spyOn(router, 'push');
  await router.isReady();

  await fireEvent.click(wrapper.getByText('Sign In'));

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});
