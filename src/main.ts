import '@unocss/reset/tailwind.css';
import 'uno.css';
import { createApp } from 'vue';

import { router } from '~/core/router';
import { i18n } from '~/core/i18n';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#root');
