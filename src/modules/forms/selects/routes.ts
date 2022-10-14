import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/forms/selects/single-selects',
    component: () => import('~/modules/forms/selects/single-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/selects/multiple-selects',
    component: () => import('~/modules/forms/selects/multiple-selects/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
