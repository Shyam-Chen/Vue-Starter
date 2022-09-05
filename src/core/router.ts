import { createWebHistory, createRouter } from 'vue-router';

import Home from '~/Home.vue';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/store-pattern',
      name: 'storePattern',
      component: () => import('~/modules/store-pattern/StorePattern.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('~/modules/error-handling/NotFound.vue'),
    },
  ],
});
