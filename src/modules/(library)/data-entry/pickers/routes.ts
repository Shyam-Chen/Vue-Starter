import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/data-entry/pickers/date-pickers',
    component: () => import('./date-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/pickers/month-pickers',
    component: () => import('./month-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/pickers/time-pickers',
    component: () => import('./time-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/pickers/week-pickers',
    component: () => import('./week-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/pickers/year-pickers',
    component: () => import('./year-pickers/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
