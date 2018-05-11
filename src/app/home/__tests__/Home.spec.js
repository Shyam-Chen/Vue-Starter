import { shallow } from '@vue/test-utils';

import Home from '../Home';

describe('Home', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallow(Home);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
