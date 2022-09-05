import '@unocss/reset/tailwind.css';
import 'uno.css';
import { createApp } from 'vue';

import { router } from '~/core/router';

import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#root');
