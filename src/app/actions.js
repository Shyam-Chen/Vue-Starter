// @flow

import i18n from '~/core/i18n';

import { IContent } from './types';
import { INITIAL } from './constants';

export default {
  setTheme({ state }: IContent, val: string): void {
    state.theme = val;
    localStorage.setItem('theme', val);
  },
  initialLanguage({ dispatch }: IContent): void {
    INITIAL.languages.forEach(({ key }): void => {
      if (key === 'en') return;

      if ((navigator.language).includes(key)) {
        dispatch('setLanguage', key);
      }
    });
  },
  setLanguage(context: IContent, val: string): void {
    import(`./_languages/${val}.yml`).then((data): void => {  // eslint-disable-line
      i18n.setLocaleMessage(val, data);
      i18n.locale = val;
      document.documentElement.lang = val;  // eslint-disable-line
      localStorage.setItem('lang', val);
    });
  },
};
