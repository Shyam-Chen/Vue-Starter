import { createWebHistory, createRouter } from 'vue-router';

import Home from './Home.vue';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    { path: '/form-validation', component: () => import('~/modules/form-validation/Registry.vue') },
    {
      path: '/store-pattern',
      component: () => import('~/modules/store-pattern/StorePattern.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('~/modules/error-handling/NotFound.vue'),
    },
  ],
});
