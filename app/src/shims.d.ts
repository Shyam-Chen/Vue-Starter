/// <reference types="vite-plugin-vue-routes/client" />

import type { Router } from 'vue-router';
import type { Localer } from 'vue-localer';

declare global {
  interface Window {
    router: Router;
    localer: Localer;
  }
}
