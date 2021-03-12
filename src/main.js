import 'windi.css';
import { createApp } from 'vue';

import '~/core/style.css';
import { router } from '~/core/router.js';
import { stateSymbol, createState } from '~/core/store.js';
import { localer } from '~/core/localer.js';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.provide(stateSymbol, createState());
app.use(localer);

app.mount('#root');
