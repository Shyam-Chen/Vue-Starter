import axios from 'axios';

import { API_LIST } from './constants';

export default {
  success({ commit }, data) {
    commit('success', data);
  },
  failure({ commit }, error) {
    commit('failure', error);
  },

  addItem({ dispatch, state }, text) {
    if (!text) return;

    state.loading = true;

    axios.post(API_LIST, { text })
      .then(() => { state.addData.text = ''; })
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },
  searchItem({ dispatch, state }, text) {
    state.loading = true;

    axios.get(API_LIST, { params: { text } })
      .then(response => dispatch('success', response.data))
      .then(() => {
        state.loading = false;
        state.searchData.text = '';
      })
      .catch(error => dispatch('failure', error));
  },
  editItem({ dispatch, state }, item) {
    if (item.text) {
      state.editData.dialog = false;
      state.loading = true;

      axios.put(`${API_LIST}/${item.id}`, { text: item.text })
        .then(() => dispatch('searchItem'))
        .catch(error => dispatch('failure', error));
    }
  },
  deleteItem({ dispatch, state }, id) {
    state.deleteData.dialog = false;
    state.loading = true;

    axios.delete(`${API_LIST}/${id}`)
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },
};
