import '@unocss/reset/tailwind.css';
import 'uno.css';
import { createApp } from 'vue';

import { store } from '~/core/store.js';
import { router } from '~/core/router.js';
import { localer } from '~/core/localer.js';

import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(localer);

app.mount('#root');
