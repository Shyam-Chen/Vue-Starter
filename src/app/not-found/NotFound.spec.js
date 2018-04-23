import { shallow } from '@vue/test-utils';

import NotFound from './NotFound';

describe('NotFound', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallow(NotFound);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
