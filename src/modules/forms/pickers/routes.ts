import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/forms/pickers/date-pickers',
    component: () => import('~/modules/forms/pickers/date-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/pickers/month-pickers',
    component: () => import('~/modules/forms/pickers/month-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
