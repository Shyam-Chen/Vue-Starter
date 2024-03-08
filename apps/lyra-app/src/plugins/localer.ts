import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    ...import.meta.glob(['~/locales/*.ts', '!~/locales/index.ts', '!~/locales/en-US.ts']),
  },
});
