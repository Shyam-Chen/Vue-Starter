import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import I18n from 'vue-i18n';
import mockdate from 'mockdate';

import store from '~/core/store';
import router from '~/core/router';
import i18n from '~/core/i18n';
import vuetify from '~/core/vuetify';

import Home from '~/home/Home';
import HelloWorld from '~/shell/hello-world/HelloWorld';
import StateManagement from '~/shell/guide/state-management/StateManagement';
import NotFound from '~/not-found/NotFound';

import App from '../App';
import { INITIAL as state } from '../constants';
import actions from '../actions';
import getters from '../getters';

const localVue = createLocalVue();

localVue.use(Router);
localVue.use(Vuex);
localVue.use(I18n);

jest.mock('~/shell/overview/Overview', () => ({
  name: 'Overview',
  render: h => h('div'),
}));
jest.mock('~/shell/hello-world/HelloWorld', () => ({
  name: 'HelloWorld',
  render: h => h('div'),
}));

jest.mock('~/shell/guide/state-management/StateManagement', () => ({
  name: 'StateManagement',
  render: h => h('div'),
}));

describe('App', () => {
  let [wrapper] = [];

  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      router,
      store,
      i18n,
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        Date: mockdate.set('2020-01-10'),
      },
    });
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();

    router.push('/guide/state-management');
    expect(wrapper.find(StateManagement).exists());
  });

  it('', () => {
    router.push('/hello-world');
    expect(wrapper.find(HelloWorld).exists());
  });
});
