export default {
  success(state, data) {
    state.dataset = data;
  },
  failure(state, error) {
    throw error;
  },
};
