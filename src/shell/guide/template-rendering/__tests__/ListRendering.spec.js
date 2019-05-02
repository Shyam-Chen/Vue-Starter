import { shallowMount } from '@vue/test-utils';

import ListRendering from '../ListRendering';

describe('ListRendering', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(ListRendering);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
