import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/data-entry/selects/single-selects',
    component: () => import('~/modules/data-entry/selects/single-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/selects/multiple-selects',
    component: () => import('~/modules/data-entry/selects/multiple-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
