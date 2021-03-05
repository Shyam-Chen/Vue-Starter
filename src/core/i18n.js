import { createStore } from 'vuex';
import mi from 'message-interpolation';

import enUS from '~/locales/en-US';

export const langList = {
  'en-US': 'American English',
  'ja-JP': '日本語',
  'zh-TW': '正體中文',
};

export const getUserLang = () => {
  const langListKeys = Object.keys(langList);

  if (langListKeys.includes(navigator.language)) {
    return navigator.language;
  }

  const liteLangListKeys = langListKeys.map(lang => lang.split(/[-]/)[0]);
  const ISO_639_1 = navigator.language.split(/[-]/)[0];

  if (liteLangListKeys.includes(ISO_639_1)) {
    for (let i = 0; i < langListKeys.length; i += 1) {
      const lang = langListKeys[i];

      if (lang.startsWith(ISO_639_1)) {
        return lang;
      }
    }
  }

  return 'en-US';
};

export const injectLanguage = (state, { lang, locale }) => {
  state.lang = lang;
  state.locale = locale;
};

export const i18n = createStore({
  state: {
    lang: 'en-US',
    locale: enUS,
  },
  actions: {
    async initialLanguage({ commit }, mod) {
      const lang = localStorage.getItem('lang') || getUserLang();
      document.documentElement.lang = lang;
      // TODO: const response = await import(`~/locales/${lang}.js`);
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (mod) {
        const res = await import(`../modules/${mod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { lang, locale: response.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const response = await import(`../lang/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (router.currentRoute.name !== 'singleSignOn') {
        const mod = router.currentRoute.name.split('/')[0];
        const res = await import(`../modules/${mod}/lang/${lang}.js`);
        commit(`${mod}/injectLanguage`, { lang, locale: response.default });
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
