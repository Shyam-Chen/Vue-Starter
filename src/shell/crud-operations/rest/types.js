// @flow

export interface Item {
  id: string;
  text: string;
}

export interface IREST {
  selected: Item[];
  dataset: Item[];

  addData: Item;
  searchData: Item;
  editData: Item;
  deleteData: Item;

  loading: boolean;
}
