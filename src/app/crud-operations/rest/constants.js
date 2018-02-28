export const API_LIST = `${process.env.API_URL}/__/list`;

export const INITIAL = {
  dataset: [],
  addData: { text: '' },
  searchData: { text: '' },
  editData: { _id: 0, text: '', dialog: false },
  deleteData: { _id: 0, dialog: false },
  loading: false,
};

export const SUCCESS = '[REST] SUCCESS';
export const FAILURE = '[REST] FAILURE';
