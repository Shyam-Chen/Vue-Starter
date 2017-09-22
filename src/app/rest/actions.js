import axios from 'axios';

import { API_LIST, SUCCESS, FAILURE, SET_DATA } from './constants';

export default {
  success({ commit }, data) {
    commit(SUCCESS, data);
  },
  failure({ commit }, error) {
    commit(FAILURE, error);
  },

  addItem({ dispatch }, text) {
    axios.post(API_LIST, { text })
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },
  searchItem({ dispatch }, text) {
    axios.get(text ? `${API_LIST}?text=${text}` : API_LIST)
      .then(response => dispatch('success', response.data))
      .then(() => dispatch('setData', { loading: false }))
      .catch(error => dispatch('failure', error));
  },
  editItem({ dispatch }, id, text) {
    axios.put(`${API_LIST}/${id}`, { text })
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },
  deleteItem({ dispatch }, id) {
    axios.delete(`${API_LIST}/${id}`)
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },

  setData({ commit }, data) {
    commit(SET_DATA, data);
  }
};
