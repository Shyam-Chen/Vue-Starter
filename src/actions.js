// @flow

import { ActionContext } from 'vuex';

import router from '~/core/router';
import i18n from '~/core/i18n';

import { IApp } from './types';
import { INITIAL } from './constants';

export default {
  setTheme({ state }: ActionContext<IApp>, val: string): void {
    state.theme = val;
    localStorage.setItem('theme', val);
  },
  setLanguage(context: ActionContext<IApp>, val: string): void {
    import(`~/core/i18n/${val}`)
      .then((data): void => {
        i18n.setLocaleMessage(val, data.default);
        i18n.locale = val;
        document.documentElement.lang = val;
        sessionStorage.setItem('lang', val);
      });
  },
  initialLanguage({ dispatch }: ActionContext<IApp>): void {
    INITIAL.languages.forEach(({ key }): void => {
      if (key === 'en') return;

      const lang = sessionStorage.getItem('lang');
      if (lang) dispatch('setLanguage', lang);

      if ((navigator.language).includes(key)) {
        dispatch('setLanguage', key);
      }
    });
  },
  backToHome({ state }: ActionContext<IApp>): void {
    router.push('/');
    state.drawer = false;
  },
};
