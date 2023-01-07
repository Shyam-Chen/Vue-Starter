import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/layout/aspect-ratio',
    component: () => import('~/modules/layout/aspect-ratio/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/dividers',
    component: () => import('~/modules/layout/dividers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/grid',
    component: () => import('~/modules/layout/grid/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/spaces',
    component: () => import('~/modules/layout/spaces/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
