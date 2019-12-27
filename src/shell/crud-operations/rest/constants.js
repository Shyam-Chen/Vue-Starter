export const API_LIST = `${process.env.API_URL}/text-list`;

export const INITIAL = {
  selected: [],
  dataset: [],
  addData: { text: '' },
  searchData: { text: '' },
  editData: { id: 0, text: '', dialog: false },
  deleteData: { id: 0, dialog: false },
  loading: false,
};
