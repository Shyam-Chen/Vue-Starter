import { shallowMount } from '@vue/test-utils';

import Unauthorized from '../Unauthorized';

describe('Unauthorized', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(Unauthorized);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
