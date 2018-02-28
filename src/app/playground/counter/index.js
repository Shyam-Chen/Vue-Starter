import Counter from './Counter';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export { Counter };
export const counter = { state, actions, mutations, getters };
