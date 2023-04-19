import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/layout/aspect-ratio',
    component: () => import('./aspect-ratio/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/dividers',
    component: () => import('./dividers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/grid',
    component: () => import('./grid/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/layout/spaces',
    component: () => import('./spaces/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
