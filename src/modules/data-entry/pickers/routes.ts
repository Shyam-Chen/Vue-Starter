import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/data-entry/pickers/date-pickers',
    component: () => import('~/modules/data-entry/pickers/date-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/pickers/month-pickers',
    component: () => import('~/modules/data-entry/pickers/month-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
