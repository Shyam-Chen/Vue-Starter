export const API_LIST = 'https://web-go-demo.herokuapp.com/__/list';

export const INITIAL = {
  dataset: [],
  addData: { text: '' },
  searchData: { text: '' },
  editData: { _id: 0, text: '' },
  deleteData: { _id: 0 },
  loading: false
};

export const SUCCESS = '[REST] SUCCESS';
export const FAILURE = '[REST] FAILURE';
