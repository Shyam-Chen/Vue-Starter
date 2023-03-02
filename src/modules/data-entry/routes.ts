import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

import selectsRoutes from './selects/routes';
import pickersRoutes from './pickers/routes';

export default [
  {
    path: '/data-entry/text-fields',
    component: () => import('~/modules/data-entry/text-fields/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/checkboxes',
    component: () => import('~/modules/data-entry/checkboxes/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/radio-buttons',
    component: () => import('~/modules/data-entry/radio-buttons/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/switches',
    component: () => import('~/modules/data-entry/switches/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...selectsRoutes,
  {
    path: '/data-entry/slider',
    component: () => import('~/modules/data-entry/slider/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/textareas',
    component: () => import('~/modules/data-entry/textareas/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...pickersRoutes,
  {
    path: '/data-entry/file-inputs',
    component: () => import('~/modules/data-entry/file-inputs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/autocompletes',
    component: () => import('~/modules/data-entry/autocompletes/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/form-validation',
    component: () => import('~/modules/data-entry/form-validation/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/transfer',
    component: () => import('~/modules/data-entry/transfer/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
