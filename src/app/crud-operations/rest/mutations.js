import { SUCCESS, FAILURE } from './constants';

export default {
  [SUCCESS](state, data) {
    state.dataset = data;
  },
  [FAILURE](state, error) {
    console.error(error.message);
  }
};
