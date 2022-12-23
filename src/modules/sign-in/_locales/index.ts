import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale('sign-in', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'),
  'ko-KR': () => import('./ko-KR'),
  'zh-TW': () => import('./zh-TW'),
});
