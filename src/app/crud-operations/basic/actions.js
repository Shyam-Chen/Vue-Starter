// @flow

import { IContext, Item, Dialog, IContextKey } from './types';

export default {
  addItem({ state }: IContext, { primary, accent }: Item): void {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
  },
  editItem({ state }: IContext, { id, primary, accent }: Item): void {
    state.dataset = [
      ...state.dataset.map(item =>
        (item.id === id ? { ...item, primary, accent } : item),
      ),
    ];
  },
  deleteItem({ state }: IContext, { id }: Item): void {
    state.dataset = [...state.dataset.filter(item => item.id !== Number(id))];
  },
  deleteChecked({ state }: IContext, selected: Item[]): void {
    state.dataset = [
      ...state.dataset.filter(item =>
        !selected.map(selectedItem => selectedItem.id).includes(item.id),
      ),
    ];

    state.selected = [];
  },

  handleDialog({ state }: IContext, { name, value }: Dialog): void {
    state.dialogs[name] = value;
  },

  dialogData({ state }: IContextKey, { item, key }: Dialog): void {
    state[key] = { ...item };
  },
};
