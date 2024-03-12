import { useLocale } from 'vue-localer';

import type enUS from './en-US';

export default () => useLocale<typeof enUS>();
