import { shallowMount } from '@vue/test-utils';

import FilerList from '../FilerList';

describe('FilerList', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(FilerList);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with odd option', () => {
    wrapper.setData({ type: 'odd' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with even option', () => {
    wrapper.setData({ type: 'even' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
