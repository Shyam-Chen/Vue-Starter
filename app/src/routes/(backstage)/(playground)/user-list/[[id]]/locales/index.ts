import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('sign-in', {
  'en-US': enUS,
  ...import.meta.glob(['./*.ts', '!./en-US.ts']),
});
