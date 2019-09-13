// @flow

import { ActionContext } from 'vuex';

import router from '~/core/router';
import vuetify from '~/core/vuetify';
import i18n from '~/core/i18n';

import { IApp } from './types';
import { INITIAL } from './constants';

export default {
  setTheme({ state }: ActionContext<IApp>, val: string): void {
    state.theme = val;
    localStorage.setItem('theme', val);
    vuetify.framework.theme.dark = val === 'dark';
  },
  setLanguage(context: ActionContext<IApp>, val: string): void {
    import(`~/core/i18n/${val}`).then((data): void => {
      i18n.setLocaleMessage(val, data.default);
      i18n.locale = val;
      document.documentElement.lang = val;
      sessionStorage.setItem('lang', val);

      const path = router.currentRoute.path.substring(`/${val}`.length);
      router.push(`/${val}${path}`);
    });
  },
  initialLanguage({ dispatch }: ActionContext<IApp>): void {
    const foundLang = INITIAL.languages.find(
      ({ key }) => key === router.currentRoute.params.lang,
    );

    INITIAL.languages.forEach(({ key }): void => {
      if (key === 'en') return;

      const lang = sessionStorage.getItem('lang');
      if (lang) dispatch('setLanguage', lang);

      if (navigator.language.includes(key)) {
        dispatch('setLanguage', key);
      } else {
        if (foundLang !== -1 && router.currentRoute.params.lang) {
          dispatch('setLanguage', router.currentRoute.params.lang);
        }
      }
    });
  },
  backToHome({ state }: ActionContext<IApp>): void {
    router.push(`/${router.currentRoute.params.lang}`);
    state.drawer = false;
  },
};
