import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Analytics from 'vue-analytics';

import Home from '~/home/Home';
import NotFound from '~/not-found/NotFound';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home, meta: { home: true } },

    /** @name overview */
    { path: '/overview', component: () => import('~/overview/Overview') },

    /** @name hello-world */
    { path: '/hello-world', component: () => import('~/hello-world/HelloWorld') },

    /** @name 101-guide */
    { path: '/101-guide/components/props', component: () => import('~/101-guide/components/props/Props') },
    { path: '/101-guide/components/slots', component: () => import('~/101-guide/components/slots/Slots') },
    { path: '/101-guide/transitions', component: () => import('~/101-guide/transitions/Transitions') },
    { path: '/101-guide/mixins', component: () => import('~/101-guide/mixins/Mixins') },
    { path: '/101-guide/directives', component: () => import('~/101-guide/directives/Directives') },
    { path: '/101-guide/filters', component: () => import('~/101-guide/filters/Filters') },
    {
      path: '/101-guide/routing/nested-routes',
      component: () => import('~/101-guide/routing/Routing'),
      children: [
        { path: '', component: () => import('~/101-guide/routing/Default') },
        { path: 'first', component: () => import('~/101-guide/routing/First') },
        { path: 'second', component: () => import('~/101-guide/routing/Second') },
      ],
    },
    { path: '/101-guide/state-management', component: () => import('~/101-guide/state-management/StateManagement') },
    // ...

    /** @name crud-operations */
    { path: '/crud-operations/basic', component: () => import('~/crud-operations/basic/Basic') },
    { path: '/crud-operations/rest', component: () => import('~/crud-operations/rest/REST') },
    { path: '/crud-operations/graphql', component: () => import('~/crud-operations/graphql/GraphQL') },

    /** @name form-controls */
    { path: '/form-controls/text-fields', component: () => import('~/form-controls/text-fields/TextFields') },
    { path: '/form-controls/selects', component: () => import('~/form-controls/selects/Selects') },
    { path: '/form-controls/selection-controls', component: () => import('~/form-controls/selection-controls/SelectionControls') },
    { path: '/form-controls/pickers', component: () => import('~/form-controls/pickers/Pickers') },

    /** @name data-table */
    { path: '/data-table/basic', component: () => import('~/data-table/basic/Basic') },
    // { path: '/data-table/rest', component: () => import('~/data-table/rest/REST') },
    // { path: '/data-table/graphql', component: () => import('~/data-table/graphql/GraphQL') },

    /** @name internationalization */
    { path: '/internationalization', component: () => import('~/internationalization/Internationalization') },

    /** @name interactive-chart */
    { path: '/interactive-chart', component: () => import('~/interactive-chart/InteractiveChart') },

    { path: '*', component: NotFound, meta: { standalone: true } },
  ],
  async scrollBehavior(to, from, savedPosition) {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => {
        const callback = () => {
          window.requestAnimationFrame(resolve);
          window.removeEventListener('load', callback);
        };

        window.addEventListener('load', callback);
      });
    }

    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return new Promise((resolve) => {
      setTimeout(() => resolve({ y: 0 }), 200);
    });
  },
});

router.beforeEach((to, from, next) => {
  next();
});

Vue.use(Analytics, {
  id: process.env.GOOGLE_ANALYTICS,
  router,
  autoTracking: {
    page: process.env.NODE_ENV === 'production',
  },
});

export default router;
