import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/feedback/alert',
    component: () => import('~/modules/feedback/alert/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/feedback/dialogs',
    component: () => import('~/modules/feedback/dialogs/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/feedback/notification',
    component: () => import('~/modules/feedback/notification/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/feedback/progress',
    component: () => import('~/modules/feedback/progress/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/feedback/skeletons',
    component: () => import('~/modules/feedback/skeletons/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];