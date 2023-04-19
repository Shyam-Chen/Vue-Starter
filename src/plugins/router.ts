import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';
import libraryRoutes from '~/modules/(library)/routes';
import playgroundRoutes from '~/modules/(playground)/routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect() {
        if (localStorage.getItem('accessToken')) return { path: '/dashboard' };
        return { path: '/sign-in' };
      },
    },

    {
      path: '/sign-in',
      component: () => import('~/modules/sign-in/Registry.vue'),
      meta: { layout: 'center' },
    },
    {
      path: '/forgot-password',
      component: () => import('~/modules/forgot-password/Registry.vue'),
      meta: { layout: 'center' },
    },

    {
      path: '/dashboard',
      component: () => import('~/modules/dashboard/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    ...libraryRoutes,
    ...playgroundRoutes,

    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { layout: 'empty' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

export default router;
