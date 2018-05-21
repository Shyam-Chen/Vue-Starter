import { shallowMount } from '@vue/test-utils';

import NotFound from '../NotFound';

describe('NotFound', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(NotFound);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
