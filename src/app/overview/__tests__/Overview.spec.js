import { shallowMount } from '@vue/test-utils';

import Overview from '../Overview';

describe('Overview', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(Overview);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
