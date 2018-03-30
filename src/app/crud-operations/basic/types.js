// @flow

export interface Item {
  id?: number;
  primary?: string;
  accent?: string;
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

export interface IBasicKey extends IBasic {
  [key: string]: { ...Item };
}

export interface IContext {
  state: IBasic;
}

export interface IContextKey {
  state: IBasicKey;
}

export interface Dialog {
  name: string;
  value: boolean;
  item: Item;
  key: string;
}
