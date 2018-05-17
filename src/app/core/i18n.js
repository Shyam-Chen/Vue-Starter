import Vue from 'vue';
import I18n from 'vue-i18n';

import en from '~/_languages/en';

Vue.use(I18n);

const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
});

export default i18n;
