import Vue from 'vue';
import Router from 'vue-router';

import NotFound from '~/shared/NotFound';
import Overview from '~/shared/Overview';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Overview },

    { path: '/hello-world', component: () => import('~/hello-world/HelloWorld') },

    /** @name 101-guide */
    { path: '/101-guide/components/props', component: () => import('~/101-guide/components/props/Props') },

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

    /** @name internationalization */
    { path: '/i18n', component: () => import('~/i18n/I18n') },

    /** @name authorization */

    /** @name data-chart */

    /** @name realtime */

    /** @name playground */
    { path: '/counter', component: () => import('~/playground/counter/Counter') },

    { path: '*', component: NotFound },
  ],
});

export default router;
