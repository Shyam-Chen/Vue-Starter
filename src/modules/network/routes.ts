import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/network/fetch',
    component: () => import('~/modules/network/fetch/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/network/websocket',
    component: () => import('~/modules/network/websocket/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/network/eventsource',
    component: () => import('~/modules/network/eventsource/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
