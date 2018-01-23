import Counter from './Counter';
import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const counter = { state, actions, mutations, getters };

export { Counter, counter };
