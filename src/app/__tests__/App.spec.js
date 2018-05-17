import { createLocalVue, shallow } from '@vue/test-utils';
import Vuex from 'vuex';
import I18n from 'vue-i18n';
import Router from 'vue-router';

import Home from '~/home/Home';
import NotFound from '~/not-found/NotFound';

import App from '../App';
import { INITIAL as state } from '../constants';
import actions from '../actions';
import mutations from '../mutations';
import getters from '../getters';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(I18n);
localVue.use(Router);

describe('App', () => {
  let [wrapper, store, i18n, router] = [];

  beforeEach(() => {
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

    router = new Router({
      mode: 'history',
      base: process.env.APP_BASE,
      routes: [
        { path: '/', component: Home, meta: { home: true } },
        { path: '*', component: NotFound, meta: { standalone: true } },
      ],
    });

    wrapper = shallow(App, { localVue, store, i18n, router });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
