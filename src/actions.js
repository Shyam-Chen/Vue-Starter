// @flow

import { ActionContext } from 'vuex';

import router from '~/core/router';
import vuetify from '~/core/vuetify';
import i18n from '~/core/i18n';

import { IApp } from './types';
import { INITIAL } from './constants';

export default {
  setTheme(context: ActionContext<IApp>, val: string): void {
    localStorage.setItem('theme', val);
    vuetify.framework.theme.dark = val === 'dark';
  },
  setLanguage({ state }: ActionContext<IApp>, val: string): void {
    // $FlowFixMe
    import(`~/core/i18n/${val}`).then((data): void => {
      i18n.setLocaleMessage(val, data.default);
      i18n.locale = val;
      // $FlowFixMe
      document.documentElement.lang = val;
      sessionStorage.setItem('lang', val);

      const { route } = state;
      const pathname = route.path.slice(`/${route.params.lang}/`.length);

      if (pathname) {
        router.push(`/${val}/${pathname}`).catch(() => {});
      } else {
        router.push(`/${val}`).catch(() => {});
      }
    });
  },
  initialLanguage({ state, dispatch }: ActionContext<IApp>): void {
    const foundParamLang = INITIAL.languages.findIndex(
      ({ key }) => key === state.route.params.lang,
    );

    if (foundParamLang !== -1) {
      dispatch('setLanguage', state.route.params.lang);
    } else {
      dispatch('setLanguage', sessionStorage.getItem('lang') || 'en');
    }
  },
  backToHome({ state }: ActionContext<IApp>): void {
    router.push(`/${router.currentRoute.params.lang}`).catch(() => {});
    state.drawer = false;
  },
};
