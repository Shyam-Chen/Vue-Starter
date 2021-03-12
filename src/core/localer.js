import { createLocaler } from '~/vue-localer';

import { router } from './router';
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

  return 'en-US';
};

export const injectLanguage = (state, { lang, locale }) => {
  state.lang = lang;
  state.locale = locale;
};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '').split('-').join('');
}

let _mod = '';

export const l10n = createLocaler({
  state: {
    lang: 'en-US',
    locale: enUS,
  },
  actions: {
    async initialLanguage({ commit }, mod) {
      const lang = localStorage.getItem('lang') || getUserLang();
      document.documentElement.lang = lang;
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (mod) {
        _mod = mod
        const res = await import(`../modules/${mod}/locales/${lang}.js`);
        commit(`${camelize(mod)}/injectLanguage`, { locale: res.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      console.log(router.currentRoute.value.name);

      if (router.currentRoute.value.name !== 'home') {

        let mod = router.currentRoute.value.name.split('/')[0];
        const res = await import(`../modules/${_mod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: res.default });
      }
    },
  },
  mutations: {
    injectLanguage,
  },
});
