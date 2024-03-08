import { mount } from '@vue/test-utils';

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import Page from '../+page.vue';

test('/general/buttons', async () => {
  const wrapper = mount(Page, { global: { plugins: [router, localer] } });
  expect(wrapper.html()).toMatchSnapshot();
});
