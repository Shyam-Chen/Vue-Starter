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
      path: '/hello-world',
      name: 'helloWorld',
      component: () => import('~/modules/hello-world/HelloWorld.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('~/modules/error-handling/NotFound.vue'),
    },
  ],
});
