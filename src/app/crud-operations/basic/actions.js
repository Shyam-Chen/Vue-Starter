import { ADD_ITEM } from './constants';

export default {
  [ADD_ITEM]({ state }, { primary, accent }) {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
  },
};
