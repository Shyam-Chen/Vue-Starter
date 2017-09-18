import { SUCCESS, FAILURE, SET_DATA } from './constants';

export default {
  [SUCCESS](state, data) {
    state.dataset = data;
  },
  [FAILURE](state, error) {
    console.error(error.message);
  },
  [SET_DATA](state, data) {
    console.log(data);
  }
};
