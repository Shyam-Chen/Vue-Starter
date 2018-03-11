import Vue from 'vue';
import Router from 'vue-router';

import { REST } from '~/crud-operations/rest';
import { GraphQL } from '~/crud-operations/graphql';
import { FormControls, TemplateDriven, Reactive } from '~/form-controls';
// import { Counter } from '~/playground/counter';

import NotFound from '~/shared/NotFound';
import BtnLink from '~/shared/BtnLink';

Vue.use(Router);

const FormControlsLink = {
  template: `
    <div>
      <v-btn color="info" to="/form-controls/template-driven">Template-driven</v-btn>
      <v-btn color="info" disabled to="/form-controls/reactive">Reactive</v-btn>
    </div>
  `,
};

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: BtnLink },

    /** @name crud-operations */
    { path: '/rest', component: REST },
    { path: '/graphql', component: GraphQL },

    /** @name form-controls */
    {
      path: '/form-controls',
      component: FormControls,
      children: [
        { path: '', component: FormControlsLink },
        { path: 'template-driven', component: TemplateDriven },
        { path: 'reactive', component: Reactive },
      ],
    },

    /** @name data-table */

    /** @name globalization */
    { path: '/i18n', component: () => import('~/globalization/i18n/I18n') },

    /** @name authorization */

    /** @name data-chart */

    /** @name realtime */

    /** @name playground */
    { path: '/counter', component: () => import('~/playground/counter/Counter') },

    { path: '*', component: NotFound },
  ],
});
