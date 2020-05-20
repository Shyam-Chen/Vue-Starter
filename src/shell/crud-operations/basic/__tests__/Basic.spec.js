import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Basic from '../Basic';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Basic', () => {
  let [wrapper, store] = [];

  beforeEach(() => {
    store = new Vuex.Store();
    wrapper = shallowMount(Basic, { store, localVue });
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
