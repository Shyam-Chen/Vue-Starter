import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import Button from '../Button.vue';

let wrapper: VueWrapper;

afterEach(() => {
  wrapper.unmount();
});

test('Button.vue', async () => {
  wrapper = mount(Button);
  expect(wrapper.find('.Button').exists()).toBe(true);

  wrapper = mount(Button, { props: { label: 'Submit' } });
  expect(wrapper.find('.Button').text()).toBe('Submit');
});
