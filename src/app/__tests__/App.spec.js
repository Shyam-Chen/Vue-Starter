import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import I18n from 'vue-i18n';

import Home from '~/home/Home';
import NotFound from '~/not-found/NotFound';

import App from '../App';
import { INITIAL as state } from '../constants';
import actions from '../actions';
import mutations from '../mutations';
import getters from '../getters';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(Router);
localVue.use(Vuex);
localVue.use(I18n);

describe('App', () => {
  let [router, store, i18n, wrapper] = [];

  beforeEach(() => {
    router = new Router({
      mode: 'history',
      base: process.env.APP_BASE,
      routes: [
        { path: '/', component: Home, meta: { home: true } },
        { path: '*', component: NotFound, meta: { standalone: true } },
      ],
    });

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

    wrapper = shallowMount(App, {
      localVue,
      router,
      store,
      i18n,
      stubs: ['router-link', 'router-view'],
    });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
