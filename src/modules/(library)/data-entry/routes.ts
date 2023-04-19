import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

import selectsRoutes from './selects/routes';
import pickersRoutes from './pickers/routes';

export default [
  {
    path: '/data-entry/text-fields',
    component: () => import('./text-fields/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/checkboxes',
    component: () => import('./checkboxes/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/radio-buttons',
    component: () => import('./radio-buttons/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/switches',
    component: () => import('./switches/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...selectsRoutes,
  {
    path: '/data-entry/slider',
    component: () => import('./slider/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/textareas',
    component: () => import('./textareas/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...pickersRoutes,
  {
    path: '/data-entry/file-inputs',
    component: () => import('./file-inputs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/autocompletes',
    component: () => import('./autocompletes/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/form-validation',
    component: () => import('./form-validation/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-entry/transfer',
    component: () => import('./transfer/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
