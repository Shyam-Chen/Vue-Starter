// @flow

import { ActionContext } from 'vuex';

import assignDeep from '~/shared/utils/assign-deep';

import { IBasic, Item } from './types';

// If you like MobX's design pattern, then you don't have to use `mutations`.
export default {
  addItem({ state }: ActionContext<IBasic>, { primary, accent }: Item): void {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, primary, accent }];
    state.addData = {};
  },
  editItem({ state }: ActionContext<IBasic>, { id, primary, accent }: Item): void {
    state.dataset = [
      ...state.dataset.map(item => (item.id === id ? { ...item, primary, accent } : item)),
    ];
  },
  deleteItem({ state }: ActionContext<IBasic>, { id }: Item): void {
    const removeById = (arr: Item[]) => [...arr.filter(item => item.id !== Number(id))];

    state.dataset = removeById(state.dataset);
    if (state.selected.length) state.selected = removeById(state.selected);
  },
  deleteChecked({ state }: ActionContext<IBasic>, selected: Item[]): void {
    state.dataset = [
      ...state.dataset.filter(
        item => !selected.map(selectedItem => selectedItem.id).includes(item.id),
      ),
    ];

    state.selected = [];
  },

  setState(context: ActionContext<IBasic>, data: IBasic): void {
    const normalData = JSON.parse(JSON.stringify(data));
    context.state = assignDeep(context.state, normalData);
  },
};
