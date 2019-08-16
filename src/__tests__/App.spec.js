import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import I18n from 'vue-i18n';
import mockdate from 'mockdate';

import store from '~/core/store';
import router from '~/core/router';
import i18n from '~/core/i18n';
import vuetify from '~/core/vuetify';

import App from '../App';

const localVue = createLocalVue();

localVue.use(Router);
localVue.use(Vuex);
localVue.use(I18n);

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
  });

  it('Overview', () => {
    jest.mock('~/shell/overview/Overview', () => ({ name: 'Overview', render: h => h('div') }));
    router.push('/overview');
  });

  it('HelloWorld', () => {
    jest.mock('~/shell/hello-world/HelloWorld', () => ({ name: 'HelloWorld', render: h => h('div') }));
    router.push('/hello-world');
  });

  it('DisplayRows', () => {
    jest.mock('~/shell/data-table/display-rows/DisplayRows', () => ({ name: 'DisplayRows', render: h => h('div') }));
    router.push('/data-table/display-rows');
  });

  it('Paginator', () => {
    jest.mock('~/shell/data-table/paginator/Paginator', () => ({ name: 'Paginator', render: h => h('div') }));
    router.push('/data-table/paginator');
  });

  it('Iterator', () => {
    jest.mock('~/shell/data-table/iterator/Iterator', () => ({ name: 'Iterator', render: h => h('div') }));
    router.push('/data-table/iterator');
  });

  it('Internationalization', () => {
    jest.mock('~/shell/internationalization/Internationalization', () => ({ name: 'Internationalization', render: h => h('div') }));
    router.push('/internationalization');
  });

  it('DataVisualization', () => {
    jest.mock('~/shell/data-visualization/DataVisualization', () => ({ name: 'DataVisualization', render: h => h('div') }));
    router.push('/data-visualization');
  });

  it('Authorization', () => {
    jest.mock('~/shell/authorization/Authorization', () => ({ name: 'Authorization', render: h => h('div') }));
    router.push('/authorization');
  });

  it('Login', () => {
    jest.mock('~/shell/authorization/Login', () => ({ name: 'Login', render: h => h('div') }));
    router.push('/authorization/login');
  });

  it('Payment', () => {
    jest.mock('~/shell/payment/Payment', () => ({ name: 'Payment', render: h => h('div') }));
    router.push('/payment');
  });

  it('ChatRoom', () => {
    jest.mock('~/shell/messages/chat-room/ChatRoom', () => ({ name: 'ChatRoom', render: h => h('div') }));
    router.push('/messages/chat-room');
  });

  it('MachineLearning', () => {
    jest.mock('~/shell/machine-learning/MachineLearning', () => ({ name: 'MachineLearning', render: h => h('div') }));
    router.push('/machine-learning');
  });
});
