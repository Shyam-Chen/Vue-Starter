import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/state-management/crud-operations',
    component: () => import('~/modules/state-management/crud-operations/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/state-management/crud-operations/new',
    component: () => import('~/modules/state-management/crud-operations/new/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/state-management/crud-operations/:id',
    component: () => import('~/modules/state-management/crud-operations/[id]/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
