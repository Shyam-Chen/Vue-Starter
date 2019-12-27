import Vue from 'vue';
import Vuetify from 'vuetify';

import env from '../env';

Vue.config.productionTip = false;
Vue.use(Vuetify);

process.env = env;

Object.defineProperties(window, {
  matchMedia: {
    value: () => ({ matches: false }),
    writable: true,
  },
  scrollTo: { value: jest.fn() },
  resizeTo: { value: jest.fn() },
});
