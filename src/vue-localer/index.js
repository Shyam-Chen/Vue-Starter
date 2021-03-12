import { inject, computed } from 'vue';
import { Store } from 'vuex';
import mi from 'message-interpolation';

export const i18nKey = 'i18n';

export function createLocaler(options) {
  return new I18n(options);
}

export function useLocaler() {
  return inject(i18nKey);
}

export function useLocale(mod) {
  const localer = useLocaler();

  let locale = computed(() => localer.state.locale);
  if (mod) locale = computed(() => localer.state[mod].locale);

  return locale;
}

export class I18n extends Store {
  install(app, injectKey) {
    app.provide(i18nKey, this);
    app.config.globalProperties.$i18n = this;
    app.config.globalProperties.$f = mi;
  }
}
