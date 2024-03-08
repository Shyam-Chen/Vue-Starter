import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import * as xui from '@lyra/ui';
import user from 'mock/auth/user/response';
import { afterEach, test, vi } from 'vitest';

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import Baseline from '../Baseline.vue';

let wrapper: VueWrapper;

afterEach(() => {
  wrapper.unmount();
});

test('Baseline', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url): any => {
    if (url === '/auth/user') {
      return { _data: user.admin, status: 200 };
    }
  });

  wrapper = mount(Baseline, { global: { plugins: [router, localer] } });
});
