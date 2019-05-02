import { shallowMount } from '@vue/test-utils';

import ClassAndStyleBindings from '../ClassAndStyleBindings';

describe('ClassAndStyleBindings', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(ClassAndStyleBindings);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
