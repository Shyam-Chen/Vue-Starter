import FormControls from './FormControls';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import { TemplateDriven, templateDriven } from './template-driven';
import { Reactive } from './reactive';

const formControls = {
  state,
  actions,
  mutations,
  getters,
  modules: {
    templateDriven,
  },
};

export { FormControls, formControls, TemplateDriven, Reactive };
