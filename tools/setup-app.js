import Vue from 'vue';
import Vuetify from 'vuetify';
import { JSDOM } from 'jsdom';

Vue.config.productionTip = false;

Vue.use(Vuetify);

const jsdom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = jsdom.window;
global.document = jsdom.window.document;

window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
