import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Basic from '../Basic';
import { INITIAL } from '../constants';
import actions from '../actions';
import mutations from '../mutations';
import getters from '../getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Basic', () => {
  let [wrapper, store] = [];

  it('should render initial component', () => {
    store = new Vuex.Store();
    wrapper = shallowMount(Basic, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render initial component', () => {
    store = new Vuex.Store({
      modules: {
        crudOperations: {
          namespaced: true,
          modules: {
            basic: {
              namespaced: true,
              state: { ...INITIAL },
              actions,
              mutations,
              getters,
            },
          },
        },
      },
    });

    wrapper = shallowMount(Basic, { store, localVue });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
