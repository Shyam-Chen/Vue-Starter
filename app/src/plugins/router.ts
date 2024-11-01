import { createRouter, createWebHistory } from 'vue-router';
import nprogress from 'nprogress';

import routes from 'virtual:vue-routes';

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

    ...routes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { selector: to.hash };
    return savedPosition || from.meta.scrollPosition || { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (to.path !== from.path) nprogress.start();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
