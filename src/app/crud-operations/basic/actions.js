export default {
  addItem({ state }, { primary, accent }) {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
  },
  editItem({ state }, { id, primary, accent }) {
    state.dataset = [
      ...state.dataset.map(item =>
        (item.id === id ? { ...item, primary, accent } : item),
      ),
    ];
  },
  deleteItem({ state }, { id }) {
    state.dataset = [...state.dataset.filter(item => item.id !== Number(id))];
  },
  deleteChecked({ state }, selected) {
    state.dataset = [
      ...state.dataset.filter(item =>
        !selected.map(selectedItem => selectedItem.id).includes(item.id),
      ),
    ];

    state.selected = [];
  },
};
