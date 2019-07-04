// @flow

export interface Item {
  id: number;
  name: string;
  price: number;
  notes: string;
}

export interface IDailyDrinks {
  dataset: Item[];
  data: {
    add: Item | Object,
    edit: Item | Object,
    delete: Item | Object,
  };
  dialogs: {
    add: boolean,
    edit: boolean,
    delete: boolean,
  };
}
