import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/navigation/breadcrumbs',
    component: () => import('~/modules/navigation/breadcrumbs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/dropdown',
    component: () => import('~/modules/navigation/dropdown/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/drawers',
    component: () => import('~/modules/navigation/drawers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/tabs',
    component: () => import('~/modules/navigation/tabs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/steppers',
    component: () => import('~/modules/navigation/steppers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/tours',
    component: () => import('~/modules/navigation/tours/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
