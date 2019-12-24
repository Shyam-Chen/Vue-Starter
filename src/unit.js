import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Object.defineProperties(window, {
  matchMedia: {
    value: () => ({ matches: false }),
    writable: true,
  },
  scrollTo: { value: jest.fn() },
  resizeTo: { value: jest.fn() },
});
