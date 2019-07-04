// @flow

import { ActionContext } from 'vuex';

import { IDailyDrinks, Item } from './types';

export const init: IDailyDrinks = {
  dataset: [
    { id: 1, name: '春芳號 - 珍珠鮮奶茶', price: 60, notes: '奶茶濃郁，並且有加上奶泡，茶香偏多，餘韻微微回甘，珍珠彈性還不錯，但有點大小不一' },
    { id: 2, name: '天仁茗茶 - 珍珠鮮奶茶', price: 65, notes: '濃度普通，淡淡茶香，餘韻回甘，珍珠很Q有嚼勁，價位偏高但表現不俗' },
    { id: 3, name: '有茶氏 - 珍珠紅茶拿鐵', price: 60, notes: '奶香濃郁，餘韻淡淡茶香不澀口，珍珠Q彈，甜度低，嗜甜者可以點甜一點' },
    { id: 4, name: '飲川 - 紅玉茶拿鐵加珍珠', price: 70, notes: '特有的茶珍珠Q彈有口感，有點像小芋園，茶味、奶味並重，入口舒適' },
    { id: 5, name: '春水堂 - 紅茶拿鐵加珍珠', price: 60, notes: '奶茶濃郁且上方有緻密的奶泡，讓口感更為豐富，微微茶香，入口舒適，珍珠偏小，彈性尚可' },
  ],
  data: {
    add: {},
    edit: {},
    delete: {},
  },
  dialogs: {
    add: false,
    edit: false,
    delete: false,
  },
};

export const actions = {
  addItem({ state }: ActionContext<IDailyDrinks>, data: Item): void {
    const id = state.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    state.dataset = [...state.dataset, { id, ...data }];
    state.data.add = {};
  },
  editItem({ state }: ActionContext<IDailyDrinks>, data: Item): void {
    state.dataset = [
      ...state.dataset
        .map(item => (item.id === data.id ? { ...item, ...data } : item)),
    ];
  },
  deleteItem({ state }: ActionContext<IDailyDrinks>, data: Item): void {
    const removeById = (arr: Item[]) => (
      [...arr.filter(item => item.id !== Number(data.id))]
    );

    state.dataset = removeById(state.dataset);
  },
  setState(context: ActionContext<IDailyDrinks>, data: IDailyDrinks): void {
    const normalData = JSON.parse(JSON.stringify(data));
    context.state = Object.assign(context.state, normalData);
  },
};

export const getters = {};
