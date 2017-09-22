import { SUCCESS, FAILURE, SET_DATA } from './constants';

export default {
  [SUCCESS](state, data) {
    state.dataset = data.reverse();
  },
  [FAILURE](state, error) {
    console.error(error.message);
  },
  [SET_DATA](state, data) {
    state = { ...state, ...data };
    console.log(state);
  }
};
