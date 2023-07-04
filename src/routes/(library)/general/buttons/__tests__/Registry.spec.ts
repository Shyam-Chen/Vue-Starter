import { test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Registry from '../Registry.vue';

vi.mock('~/utilities/request');

test('Buttons', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>(() => {
    return { _data: {}, status: 200 };
  });

  const wrapper = mount(Registry, { global: { plugins: [router, localer] } });
  expect(wrapper.html()).toMatchSnapshot();
});
