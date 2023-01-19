import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/auth/forgot-password',
    component: () => import('~/modules/auth/forgot-password/Registry.vue'),
    meta: { layout: 'center' },
  },
  {
    path: '/auth/two-factor',
    component: () => import('~/modules/auth/two-factor/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
