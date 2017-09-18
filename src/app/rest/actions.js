import axios from 'axios';

import { API_LIST, SUCCESS, FAILURE, SET_DATA } from './constants';

export default {
  success({ commit }, data) {
    commit(SUCCESS, data);
  },
  failure({ commit }, error) {
    commit(FAILURE, error);
  },

  search({ commit }, text) {
    axios.get(text ? `${API_LIST}?text=${text}` : API_LIST)
      .then(response => commit(SUCCESS, response.data))
      .then(() => commit(SET_DATA, { loading: false }))
      .catch(error => commit(FAILURE, error));
  },

  setData({ commit }, data) {
    commit(SET_DATA, data);
  }
};
