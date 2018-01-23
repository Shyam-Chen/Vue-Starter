import REST from './REST';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const rest = { state, actions, mutations, getters };

export { REST, rest };
