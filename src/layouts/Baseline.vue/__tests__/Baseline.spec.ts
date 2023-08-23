import type { VueWrapper } from '@vue/test-utils';
import { afterEach, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import responses from 'responses/auth';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Baseline from '../Baseline.vue';

let wrapper: VueWrapper;

afterEach(() => {
  wrapper.unmount();
});

vi.mock('~/utilities/request');

test('Baseline', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>((url) => {
    if (url === '/auth/user') {
      return { _data: responses['get_/user'], status: 200 };
    }
  });

  wrapper = mount(Baseline, { global: { plugins: [router, localer] } });
});
