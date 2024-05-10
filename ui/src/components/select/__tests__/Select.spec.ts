import { createLocaler } from 'vue-localer';
import { mount } from '@vue/test-utils';

import Select from '../Select.vue';

const localer = createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {},
  },
});

describe('Select.vue', () => {
  it('displays placeholder when no option is selected', () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: 'Select an option',
        options: [{ label: 'Option 1', value: '1' }],
      },
      global: {
        plugins: [localer],
      },
    });

    expect(wrapper.text()).toContain('Select an option');
  });

  it('displays selected option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Option 1', value: '1' }],
      },
      global: {
        plugins: [localer],
      },
    });

    await wrapper.setProps({ value: '1' });

    expect(wrapper.text()).toContain('Option 1');
  });

  it('emits change event when option is selected', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Option 1', value: '1' }],
      },
      global: {
        plugins: [localer],
      },
    });

    await wrapper.find('.Select-Item').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted().change[0]).toEqual(['1', { label: 'Option 1', value: '1' }]);
  });

  it('filters options based on input', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        filterable: true,
      },
      global: {
        plugins: [localer],
      },
    });

    await wrapper.find('input').setValue('Option 1');

    expect(wrapper.findAll('.Select-Item')).toHaveLength(1);
    expect(wrapper.text()).toContain('Option 1');
  });

  it('displays not found content when no options match filter', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        filterable: true,
        notFoundContent: 'No options found',
      },
      global: {
        plugins: [localer],
      },
    });

    await wrapper.find('input').setValue('Option 3');

    expect(wrapper.text()).toContain('No options found');
  });

  it('does not allow selection when disabled', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Option 1', value: '1' }],
        disabled: true,
      },
      global: {
        plugins: [localer],
      },
    });

    await wrapper.find('.Select-Input').trigger('click');

    expect(wrapper.emitted()).not.toHaveProperty('change');
  });

  it('displays placeholder when options list is empty', () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: 'No options available',
        options: [],
      },
      global: {
        plugins: [localer],
      },
    });

    expect(wrapper.text()).toContain('No options available');
  });
});
