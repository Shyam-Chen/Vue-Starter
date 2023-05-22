import { test, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

test('Buttons', () => {
  vi.mock('~/utilities/request', () => {
    return {
      default: vi.fn(() => () => ({
        _data: {},
        status: 200,
      })),
    };
  });

  const { html } = render(Registry, { global: { plugins: [router, localer] } });
  expect(html()).toMatchSnapshot();
});
