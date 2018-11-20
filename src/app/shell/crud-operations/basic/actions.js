// @flow

import { ActionContext } from 'vuex';

import { IBasic, Item } from './types';

export default {
  addItem({ state }: ActionContext<IBasic>, { primary, accent }: Item): void {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];

    state.addData = {};
  },
  editItem({ state }: ActionContext<IBasic>, { id, primary, accent }: Item): void {
    state.dataset = [
      ...state.dataset
        .map(item => (item.id === id ? { ...item, primary, accent } : item)),
    ];
  },
  deleteItem({ state }: ActionContext<IBasic>, { id }: Item): void {
    state.dataset = [...state.dataset.filter(item => item.id !== Number(id))];
  },
  deleteChecked({ state }: ActionContext<IBasic>, selected: Item[]): void {
    state.dataset = [
      ...state.dataset
        .filter(item => !selected.map(selectedItem => selectedItem.id).includes(item.id)),
    ];

    state.selected = [];
  },

  setState(context: ActionContext<IBasic>, data: IBasic): void {
    context.state = Object.assign(context.state, data);
  },
};
