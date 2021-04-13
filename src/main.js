import 'virtual:windi.css';
import { createApp } from 'vue';

import { router } from '~/core/router.js';
import { localer } from '~/core/localer.js';
import { stateSymbol, createState } from '~/core/store.js';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(localer);
app.provide(stateSymbol, createState());

app.mount('#root');
