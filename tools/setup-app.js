import 'jest-localstorage-mock';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import Vue from 'vue';
import Vuetify from 'vuetify';

expect.extend({ toMatchImageSnapshot });

Vue.config.productionTip = false;

Vue.use(Vuetify);

window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
