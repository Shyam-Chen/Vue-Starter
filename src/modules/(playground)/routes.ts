import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

import crudOperationsRoutes from './crud-operations/routes';

export default [
  {
    path: '/counter',
    component: () => import('./counter/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...crudOperationsRoutes,
  {
    path: '/user-list/:id?',
    component: () => import('./user-list/[[id]]/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/two-factor-auth',
    component: () => import('./two-factor-auth/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
