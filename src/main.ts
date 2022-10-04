import '@unocss/reset/tailwind.css';
import 'uno.css';
import { createApp } from 'vue';

import { router } from '~/plugins/router';
import { i18n } from '~/plugins/i18n';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#root');
