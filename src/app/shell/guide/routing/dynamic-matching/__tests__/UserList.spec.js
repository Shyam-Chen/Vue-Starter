import { shallowMount } from '@vue/test-utils';

import UserList from '../UserList';

describe('UserList', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(UserList);
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
