import { shallowMount } from '@vue/test-utils';

import Overview from '../Overview';

describe('Overview', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(Overview);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
