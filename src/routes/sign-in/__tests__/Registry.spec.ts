import { test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import responses from 'responses/auth';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

test('Sign-in', async () => {
  vi.mock('~/utilities/request', () => {
    return {
      default: vi.fn((url) => {
        if (url === '/auth/sign-in') {
          return {
            _data: responses['post_/sign-in'],
            status: 200,
          };
        }

        return {};
      }),
    };
  });

  const wrapper = render(Registry, { global: { plugins: [router, localer] } });
  const push = vi.spyOn(router, 'push');
  await router.isReady();

  await fireEvent.click(wrapper.getByText('Sign In'));

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith('/dashboard');
});
