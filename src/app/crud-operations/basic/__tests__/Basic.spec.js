import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';

import Basic from '../Basic';
import { INITIAL } from '../constants';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Basic', () => {
  let [wrapper, store] = [];
  let [state, actions, mutations, getters] = [];

  beforeEach(() => {
    state = INITIAL;

    actions = {
      addItem: jest.fn(),
      editItem: jest.fn(),
      deleteItem: jest.fn(),
      deleteChecked: jest.fn(),
    };

    mutations = {};
    getters = {};

    store = new Vuex.Store({
      modules: {
        crudOperations: {
          modules: {
            basic: {
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
