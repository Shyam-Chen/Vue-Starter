import FormControls from './FormControls';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import BasicForms from './BasicForms';
import ReactiveForms from './ReactiveForms';

const formControls = { state, actions, mutations, getters };

export { FormControls, formControls, BasicForms, ReactiveForms };
