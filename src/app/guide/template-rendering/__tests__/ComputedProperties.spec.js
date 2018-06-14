import { shallowMount } from '@vue/test-utils';

import ComputedProperties from '../ComputedProperties';

describe('ComputedProperties', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(ComputedProperties);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
