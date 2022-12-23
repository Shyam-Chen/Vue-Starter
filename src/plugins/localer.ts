import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': () => import('~/locales/ja-JP'),
    'ko-KR': () => import('~/locales/ko-KR'),
    'zh-TW': () => import('~/locales/zh-TW'),
  },
});
