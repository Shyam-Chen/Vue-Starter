import FormControls from './FormControls';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import { BasicForms, basicForms } from './basic-forms';
import { ReactiveForms } from './reactive-forms';

const formControls = {
  state,
  actions,
  mutations,
  getters,
  modules: {
    basicForms
  }
};

export { FormControls, formControls, BasicForms, ReactiveForms };
