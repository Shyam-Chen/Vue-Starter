import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/navigation/breadcrumbs',
    component: () => import('./breadcrumbs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/drawers',
    component: () => import('./drawers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/dropdown',
    component: () => import('./dropdown/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/pagination',
    component: () => import('./pagination/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/steppers',
    component: () => import('./steppers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/tabs',
    component: () => import('./tabs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/navigation/tours',
    component: () => import('./tours/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
