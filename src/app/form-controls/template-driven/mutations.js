export const updateModel = () => ({
  // TODO: scope
  [`update`](state, { label, value }) {
    state[label] = value;
  }
})

export default {
  ...updateModel()
};
