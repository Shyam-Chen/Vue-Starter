import FormControls from './FormControls';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const formControls = { state, actions, mutations, getters };

export { FormControls, formControls };
