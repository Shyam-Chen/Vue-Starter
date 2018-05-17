import Vuex from 'vuex';
import { createLocalVue, shallow } from '@vue/test-utils';
import I18n from 'vue-i18n';

import Counter from '../StateManagement';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(I18n);

describe('Counter', () => {
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

    wrapper = shallow(Counter, { localVue, store, i18n });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
