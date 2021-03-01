import { createStore } from 'vuex';
import mi from 'message-interpolation';

import enUS from '~/locales/en-US';

export const injectLanguage = (state, { lang, locale }) => {
  state.lang = lang;
  state.locale = locale;
};

export const i18n = createStore({
  state: {
    lang: 'en-US',
    list: '',
    locale: enUS,
  },
  actions: {
    async initialLanguage({ commit }, mod) {
      const lang = localStorage.getItem('lang') || getUserLang();
      document.documentElement.lang = lang;
      const response = await import(`~/locales/${lang}.js`);
      commit('injectLanguage', { userLang: lang, lang: response.default });

      if (mod) {
        const res = await import(`~/modules/${mod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { userLang: lang, lang: res.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const response = await import(`~/lang/${lang}.js`);
      commit('injectLanguage', { userLang: lang, lang: response.default });

      if (router.currentRoute.name !== 'singleSignOn') {
        const mod = router.currentRoute.name.split('/')[0];
        const res = await import(`~/modules/${mod}/lang/${lang}.js`);
        commit(`${mod}/injectLanguage`, { userLang: lang, lang: res.default });
      }
    },
  },
  mutations: {
    injectLanguage,
  },
});

export const plugin = {
  install(app, options) {
    app.config.globalProperties.$f = mi;
  },
};
