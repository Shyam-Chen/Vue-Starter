import '@unocss/reset/tailwind.css';
import './style.css';
import 'uno.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import App from './App.vue';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(localer);

app.mount('#root');
