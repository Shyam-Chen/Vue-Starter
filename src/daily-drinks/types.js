// @flow

export interface Item {
  id: number;
  name: string;
  price: number;
  notes: string;
}

export interface IDailyDrinks {
  dataset: Item[];
  addData: Item | Object;
  editData: Item | Object;
  deleteData: Item | Object;
  dialogs: {
    add: boolean,
    edit: boolean,
    delete: boolean,
  };
}
