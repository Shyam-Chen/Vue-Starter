// @flow

export interface Item {
  id: number;
  primary: string;
  accent: string;
}

export interface IBasic {
  searchData: string;
  selected: Item[];

  headers: Array<{ text: string, value: string }>;
  dataset: Item[];

  addData: Item | Object;
  viewData: Item | Object;
  editData: Item | Object;
  deleteData: Item | Object;

  dialogs: {
    add: boolean,
    edit: boolean,
    view: boolean,
    delete: boolean,
  };
}
