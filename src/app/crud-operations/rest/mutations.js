import { SUCCESS, FAILURE } from './constants';

export default {
  [SUCCESS](state, data) {
    state.dataset = data.reverse();
  },
  [FAILURE](state, error) {
    console.error(error.message);
  }
};
