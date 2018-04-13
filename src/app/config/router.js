import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import NotFound from '~/shared/NotFound';
import Overview from '~/shared/Overview';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Overview },

    /**
     * @name basic
     */
    /** @name hello-world */
    { path: '/hello-world', component: () => import('~/hello-world/HelloWorld') },

    /** @name 101-guide */
    { path: '/101-guide/components/props', component: () => import('~/101-guide/components/props/Props') },
    { path: '/101-guide/components/slots', component: () => import('~/101-guide/components/slots/Slots') },
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

    /**
     * @name advanced
     */
    /** @name 201-guide */
    /** @name reactive-forms */
    /** @name authorization */
    /** @name data-visualization */
    /** @name sockets */
    /** @name torrents */
    /** @name virtual-reality */

    /**
     * @name playground
     */
    { path: '/counter', component: () => import('~/playground/counter/Counter') },
    // ...

    { path: '*', component: NotFound },
  ],
});

export default router;
