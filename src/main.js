import 'windi.css';
import { createApp } from 'vue';

import '~/core/style.css';
import { router } from '~/core/router.js';
import { i18n, plugin } from '~/core/i18n.js';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(plugin);

app.mount('#root');
