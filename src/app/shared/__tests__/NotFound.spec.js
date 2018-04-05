import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import NotFound from '../NotFound';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Not Found', () => {
  let [wrapper, store] = [];

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        theme: 'light',
      },
    });

    wrapper = shallow(NotFound, { localVue, store });
  });

  it('should render light component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render dark component', () => {
    store.state.theme = 'dark';
    expect(wrapper.html()).toMatchSnapshot();
  });
});
