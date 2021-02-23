import 'windi.css';
import { createApp } from 'vue';

import '~/core/style.css';
import {router} from '~/core/router.js';
import App from './App.vue';

createApp(App)
.use(router)
.mount('#root');
