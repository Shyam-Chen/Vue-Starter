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
}

export interface IData {
  editDialog: boolean;
  deleteDialog: boolean;
}

export interface IContext {
  state: IBasic;
}
