import { shallowMount } from '@vue/test-utils';

import FadeInAndOut from '../FadeInAndOut';

describe('FadeInAndOut', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(FadeInAndOut);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
