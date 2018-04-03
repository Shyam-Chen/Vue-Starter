import Vue from 'vue';
import I18n from 'vue-i18n';

Vue.use(I18n);

const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      basic: 'Basic',
      advanced: 'Advanced',
      playground: 'Playground',
      counter: 'Counter',
    },
    zh: {
      basic: '基本',
      advanced: '進階',
      playground: '樂園',
      counter: '計數器',
    },
    ja: {
      basic: 'ベーシック',
      advanced: '上級',
      playground: '遊び場',
      counter: 'カウンタ',
    },
  },
});

export default i18n;
