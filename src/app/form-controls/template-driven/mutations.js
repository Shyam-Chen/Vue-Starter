export const updateModel = () => ({
  update(state, { label, value }) {
    state[label] = value;
  }
})

export default {
  ...updateModel()
};
