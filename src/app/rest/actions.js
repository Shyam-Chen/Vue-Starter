import axios from 'axios';

import { API_LIST, SUCCESS, FAILURE } from './constants';

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
  searchItem({ dispatch, state }, text) {
    axios.get(text ? `${API_LIST}?text=${text}` : API_LIST)
      .then(response => dispatch('success', response.data))
      .then(() => { state.loading = false; })
      .catch(error => dispatch('failure', error));
  },
  editItem({ dispatch }, { _id, text }) {
    axios.put(`${API_LIST}/${_id}`, { text })
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  },
  deleteItem({ dispatch }, id) {
    axios.delete(`${API_LIST}/${id}`)
      .then(() => dispatch('searchItem'))
      .catch(error => dispatch('failure', error));
  }
};
