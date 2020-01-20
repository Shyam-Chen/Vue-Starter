import Vue from 'vue';
import Vuetify from 'vuetify';

import env from '../env';

Vue.config.productionTip = false;
Vue.use(Vuetify);

process.env = env;

Object.defineProperties(window, {
  matchMedia: {
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
    writable: true,
  },
  scrollTo: { value: jest.fn() },
  resizeTo: { value: jest.fn() },
});
