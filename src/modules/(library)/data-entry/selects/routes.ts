import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/data-entry/selects/single-selects',
    component: () => import('./single-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/selects/multiple-selects',
    component: () => import('./multiple-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
