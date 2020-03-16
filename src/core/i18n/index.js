import Vue from 'vue';
import I18n from 'vue-i18n';

import en from './en';

Vue.use(I18n);

export const userLang = () => {
  if (['zh-CN', 'zh-SG'].includes(navigator.language)) return 'zh-Hans';
  if (['zh-TW', 'zh-HK'].includes(navigator.language)) return 'zh-Hant';
  if (['pt-BR'].includes(navigator.language)) return 'pt-BR';
  return navigator.language.split(/[-]/)[0];
};

const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
});

export default i18n;
