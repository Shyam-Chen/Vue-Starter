import { createLocalVue, shallowMount } from '@vue/test-utils';
import mockdate from 'mockdate';

import Filters from '../Filters';

const localVue = createLocalVue();

describe('Filters', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(Filters, {
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        Date: mockdate.set('2020-01-10'),
      },
    });
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
