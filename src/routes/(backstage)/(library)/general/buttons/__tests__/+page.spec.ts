import { test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import Page from '../+page.vue';

vi.mock('~/utilities/request');

test('Buttons', async () => {
  const request = await import('~/utilities/request');

  request.default = vi.fn<any>(() => {
    return { _data: {}, status: 200 };
  });

  const wrapper = mount(Page, { global: { plugins: [router, localer] } });
  expect(wrapper.html()).toMatchSnapshot();
});
