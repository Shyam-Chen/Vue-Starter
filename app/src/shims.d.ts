/// <reference types="vite-plugin-vue-routes/client" />

import type { Localer } from 'vue-localer';
import type { Router } from 'vue-router';

declare global {
  interface Window {
    router: Router;
    localer: Localer;
  }
}
