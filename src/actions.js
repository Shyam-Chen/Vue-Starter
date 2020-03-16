// @flow

import { ActionContext } from 'vuex';

import router from '~/core/router';
import vuetify from '~/core/vuetify';
import i18n, { userLang } from '~/core/i18n';

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

      router.push({ path: state.route.path, query: { hl: val } }).catch(() => {});
    });
  },
  initialLanguage({ dispatch }: ActionContext<IApp>, hl: string): void {
    const foundParamLang = INITIAL.languages.findIndex(({ key }) => key === hl);

    if (foundParamLang !== -1) {
      dispatch('setLanguage', hl);
    } else {
      dispatch('setLanguage', sessionStorage.getItem('lang') || userLang());
    }
  },
  backToHome({ state }: ActionContext<IApp>): void {
    router.push(`/${router.currentRoute.params.lang}`).catch(() => {});
    state.drawer = false;
  },
};
