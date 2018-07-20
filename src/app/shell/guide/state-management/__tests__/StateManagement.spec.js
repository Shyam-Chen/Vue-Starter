import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import I18n from 'vue-i18n';

import StateManagement from '../StateManagement';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(I18n);

describe('StateManagement', () => {
  let [wrapper, store, i18n] = [];
  let [state, actions, mutations, getters] = [];

  beforeEach(() => {
    state = { value: 0 };

    actions = {
      increment: jest.fn(),
      decrement: jest.fn(),
      incrementAsync: jest.fn(),
      decrementAsync: jest.fn(),
      incrementIfOdd: jest.fn(),
      decrementIfEven: jest.fn(),
    };

    mutations = {
      increment: jest.fn(),
      decrement: jest.fn(),
    };

    getters = {
      evenOrOdd: jest.fn(() => 'even'),
    };

    store = new Vuex.Store({
      modules: {
        counter: {
          state,
          actions,
          mutations,
          getters,
        },
      },
    });

    i18n = new I18n({
      locale: 'en',
      messages: { en },
    });

    wrapper = shallowMount(StateManagement, { localVue, store, i18n });
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
