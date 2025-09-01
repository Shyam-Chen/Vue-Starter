import '@unocss/reset/tailwind.css';
import 'uno.css';
import { createApp } from 'vue';
import localer from '~/plugins/localer';
import router from '~/plugins/router';

import App from './App.vue';

const app = createApp(App);

app.use(router);
window.router = router;

app.use(localer);
window.localer = localer;

app.mount('#root');
