export default {
  addItem({ state }, { primary, accent }) {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
  },
};
