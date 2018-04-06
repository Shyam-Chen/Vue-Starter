import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import Basic from '../Basic';
import { INITIAL } from '../constants';
import actions from '../actions';
import mutations from '../mutations';
import getters from '../getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Basic', () => {
  let [wrapper, store, state] = [];

  beforeEach(() => {
    state = { ...INITIAL };

    store = new Vuex.Store({
      modules: {
        crudOperations: {
          namespaced: true,
          modules: {
            basic: {
              namespaced: true,
              state,
              actions,
              mutations,
              getters,
            },
          },
        },
      },
    });

    wrapper = shallow(Basic, { store, localVue });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
