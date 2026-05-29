/// <reference types="vite-plugin-vue-routes/client" />

import type { Localer } from 'vue-localer';
import type { Router } from 'vue-router';

declare global {
  var router: Router;
  var localer: Localer;
}
