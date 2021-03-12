import { createLocaler } from 'vue-localer';

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

function camelToHyphen(str) {
  return str.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase());
}

let _mod = '';

export const localer = createLocaler({
  data: {
    lang: 'en-US',
    locale: enUS,
  },
  methods: {
    async initialLanguage({ commit }, mod) {
      const lang = localStorage.getItem('lang') || getUserLang();
      document.documentElement.lang = lang;
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (mod) {
        _mod = camelToHyphen(mod);
        const res = await import(`../modules/${_mod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: res.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (router.currentRoute.value.name !== 'home') {
        let mod = router.currentRoute.value.name.split('/')[0];
        const res = await import(`../modules/${_mod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: res.default });
      }
    },
  },
});
