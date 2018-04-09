import { shallow } from '@vue/test-utils';

import Overview from '../Overview';

describe('Overview', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallow(Overview);
  });

  it('should render light component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
