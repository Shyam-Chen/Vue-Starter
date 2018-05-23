// @flow

import i18n from '~/core/i18n';

import { IContent } from './types';
import { INITIAL } from './constants';

export default {
  setTheme({ state }: IContent, val: string): void {
    state.theme = val;
    localStorage.setItem('theme', val);
  },
  setLanguage(context: IContent, val: string): void {
    import(`~/core/i18n/${val}`).then((data): void => {  // eslint-disable-line
      i18n.setLocaleMessage(val, data.default);
      i18n.locale = val;
      document.documentElement.lang = val;  // eslint-disable-line
      sessionStorage.setItem('lang', val);
    });
  },
  initialLanguage({ dispatch }: IContent): void {
    INITIAL.languages.forEach(({ key }): void => {
      if (key === 'en') return;

      const lang = sessionStorage.getItem('lang');
      if (lang) dispatch('setLanguage', lang);

      if ((navigator.language).includes(key)) {
        dispatch('setLanguage', key);
      }
    });
  },
};
