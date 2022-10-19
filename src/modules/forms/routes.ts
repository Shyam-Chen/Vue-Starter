import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

import selectsRoutes from './selects/routes';
import pickersRoutes from './pickers/routes';

export default [
  {
    path: '/forms/text-fields',
    component: () => import('~/modules/forms/text-fields/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/checkboxes',
    component: () => import('~/modules/forms/checkboxes/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/radio-buttons',
    component: () => import('~/modules/forms/radio-buttons/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/switches',
    component: () => import('~/modules/forms/switches/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...selectsRoutes,
  {
    path: '/forms/textareas',
    component: () => import('~/modules/forms/textareas/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  ...pickersRoutes,
  {
    path: '/forms/file-inputs',
    component: () => import('~/modules/forms/file-inputs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/forms/form-validation',
    component: () => import('~/modules/forms/form-validation/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
