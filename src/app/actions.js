import i18n from '~/config/i18n';

import { INITIAL } from './constants';

export default {
  setTheme({ state }, val) {
    state.theme = val;
    localStorage.setItem('theme', val);
  },
  initialLanguage({ dispatch }) {
    INITIAL.languages.forEach(({ key }) => {
      if (key === 'en') return;

      if ((navigator.language).includes(key)) {
        dispatch('setLanguage', key);
      }
    });
  },
  setLanguage(context, val) {
    import(`./_languages/${val}.yml`).then((data) => {  // eslint-disable-line
      i18n.setLocaleMessage(val, data);
      i18n.locale = val;
      document.documentElement.lang = val;  // eslint-disable-line
    });
  },
};
