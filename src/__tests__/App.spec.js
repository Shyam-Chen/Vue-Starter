import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import I18n from 'vue-i18n';
import { sync } from 'vuex-router-sync';
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
    sync(store, router);

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

  it('should render an initial component', done => {
    expect(wrapper.html()).toMatchSnapshot();

    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);

    wrapper.vm.$nextTick(() => {
      window.dispatchEvent(resizeEvent);
      done();
    });
  });
});

describe('Routes', () => {
  it('Overview', () => {
    jest.mock('~/shell/overview/Overview', () => ({ name: 'Overview', render: h => h('div') }));
    router.push('/overview').catch(() => {});
  });

  it('HelloWorld', () => {
    jest.mock('~/shell/hello-world/HelloWorld', () => ({
      name: 'HelloWorld',
      render: h => h('div'),
    }));
    router.push('/hello-world').catch(() => {});
  });

  it('DisplayRows', () => {
    jest.mock('~/shell/data-table/display-rows/DisplayRows', () => ({
      name: 'DisplayRows',
      render: h => h('div'),
    }));
    router.push('/data-table/display-rows').catch(() => {});
  });

  it('Paginator', () => {
    jest.mock('~/shell/data-table/paginator/Paginator', () => ({
      name: 'Paginator',
      render: h => h('div'),
    }));
    router.push('/data-table/paginator').catch(() => {});
  });

  it('Iterator', () => {
    jest.mock('~/shell/data-table/iterator/Iterator', () => ({
      name: 'Iterator',
      render: h => h('div'),
    }));
    router.push('/data-table/iterator').catch(() => {});
  });

  it('Internationalization', () => {
    jest.mock('~/shell/internationalization/Internationalization', () => ({
      name: 'Internationalization',
      render: h => h('div'),
    }));
    router.push('/internationalization').catch(() => {});
  });

  it('DataVisualization', () => {
    jest.mock('~/shell/data-visualization/DataVisualization', () => ({
      name: 'DataVisualization',
      render: h => h('div'),
    }));
    router.push('/data-visualization').catch(() => {});
  });

  it('Authorization', () => {
    jest.mock('~/shell/authorization/Authorization', () => ({
      name: 'Authorization',
      render: h => h('div'),
    }));
    router.push('/authorization').catch(() => {});
  });

  it('Login', () => {
    jest.mock('~/shell/authorization/Login', () => ({ name: 'Login', render: h => h('div') }));
    router.push('/authorization/login').catch(() => {});
  });

  it('Payment', () => {
    jest.mock('~/shell/payment/Payment', () => ({ name: 'Payment', render: h => h('div') }));
    router.push('/payment').catch(() => {});
  });

  it('ChatRoom', () => {
    jest.mock('~/shell/messages/chat-room/ChatRoom', () => ({
      name: 'ChatRoom',
      render: h => h('div'),
    }));
    router.push('/messages/chat-room').catch(() => {});
  });

  it('MachineLearning', () => {
    jest.mock('~/shell/machine-learning/MachineLearning', () => ({
      name: 'MachineLearning',
      render: h => h('div'),
    }));
    router.push('/machine-learning').catch(() => {});
  });

  it('NotFound', () => {
    jest.mock('~/errors/not-found/NotFound', () => ({ name: 'NotFound', render: h => h('div') }));
    router.push('/foo/bar').catch(() => {});
  });
});
