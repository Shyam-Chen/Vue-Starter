import { mount } from '@vue/test-utils';
import { createLocaler } from 'vue-localer';

import Select from '../Select.vue';

const localer = createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {},
  },
});

test('Select.vue', async () => {
  const wrapper = mount(Select, {
    props: {
      label: 'Example label',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
    },
    global: {
      plugins: [localer],
      stubs: {
        teleport: true,
      },
    },
  });

  expect(wrapper.find('label').text()).toBe('Example label');

  await wrapper.find('input').trigger('click');

  expect(wrapper.find({ ref: 'list' }).exists()).toBe(true);
  expect(wrapper.findAll('.Select-Item').length).toBe(3);
});
