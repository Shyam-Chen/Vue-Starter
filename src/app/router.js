import Vue from 'vue';
import router from 'vue-router';

import { REST } from '~/crud-operations/rest';
import { GraphQL } from '~/crud-operations/graphql';
import { FormControls, TemplateDriven, ReactiveForms } from '~/form-controls';
import { Counter } from '~/playground/counter';

import NotFound from '~/shared/NotFound';
import CardLink from '~/shared/CardLink';

Vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    { path: '/', component: CardLink },
    { path: '/counter', component: Counter },
    { path: '/rest', component: REST },
    { path: '/graphql', component: GraphQL },
    {
      path: '/form-controls', component: FormControls,
      children: [
        { path: 'template-driven', component: TemplateDriven },
        { path: 'reactive-forms', component: ReactiveForms }
      ]
    },
    { path: '*', component: NotFound }
  ]
});
