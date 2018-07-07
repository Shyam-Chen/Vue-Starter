import { shallowMount } from '@vue/test-utils';

import Filters from '../Filters';

describe('Filters', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(Filters);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
