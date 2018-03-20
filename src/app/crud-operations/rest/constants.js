export const API_LIST = `${process.env.FUNC_URL}/api/text-list`;

export const INITIAL = {
  dataset: [],
  addData: { text: '' },
  searchData: { text: '' },
  editData: { id: 0, text: '', dialog: false },
  deleteData: { id: 0, dialog: false },
  loading: false,
};
