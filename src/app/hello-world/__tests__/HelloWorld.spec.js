import { shallow } from '@vue/test-utils';

import HelloWorld from '../HelloWorld';

describe('Hello World', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallow(HelloWorld);
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
