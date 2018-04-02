// @flow

export interface Item {
  id?: number;
  primary?: string;
  accent?: string;
}

export interface Dialog {
  name: string;
  value: boolean;
  item: Item;
  key: string;
}

export interface IBasic {
  searchData: string;
  selected: Item[];
  headers: Array<{ text: string, value: string }>;
  dataset: Item[];
  addData: Item;
  editData: Item;
  deleteData: Item;
  dialogs: { edit: boolean, delete: boolean };
}

export interface IContext {
  state: IBasic;
}

export interface IContextKey {
  state: { ...IBasic, [key: string]: { ...Item } };
}
