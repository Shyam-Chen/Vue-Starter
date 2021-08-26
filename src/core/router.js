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
      path: '/store-pattern',
      name: 'storePattern',
      component: () => import('~/modules/store-pattern/StorePattern.vue'),
    },
    {
      path: '/form-validation',
      name: 'formValidation',
      component: () => import('~/modules/form-validation/FormValidation.vue'),
    },
    {
      path: '/crud-operations',
      component: () => import('~/modules/crud-operations/CrudOperations.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('~/modules/error-handling/NotFound.vue'),
    },
  ],
});
