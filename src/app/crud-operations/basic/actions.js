import { origin } from './constants';

export default {
  addItem({ state }, { primary, accent }) {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
  },
  searchItem({ state }, { primary, accent }) {
    state.dataset = origin.filter(item =>
      (item.primary.toLowerCase().indexOf(primary.toLowerCase()) !== -1) &&
      (item.accent.toLowerCase().indexOf(accent.toLowerCase()) !== -1),
    );
  },
};
