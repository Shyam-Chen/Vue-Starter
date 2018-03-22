import Vue from 'vue';
import I18n from 'vue-i18n';

Vue.use(I18n);

const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
    },
    zh: {
      message: {
        hello: '你好，世界',
      },
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
      },
    },
  },
});

export default i18n;
