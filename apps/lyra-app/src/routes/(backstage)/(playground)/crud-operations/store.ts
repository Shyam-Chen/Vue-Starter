import { useNotification, request } from '@lyra/ui';
import { reactive, readonly } from 'vue';
import { defineStore } from 'pinia';

import type { State, TodoItem, XTableProps } from './types';

export default defineStore('/crud-operations', () => {
  const notification = useNotification();

  const state = reactive<State>({
    searchForm: { filter: 0 },

    todosLoading: false,
    todosRows: [],
    todosCount: 0,
    todosControl: {},

    deleteDialog: false,
    deleteExpected: '',
    deleteContent: {},
    deleteLoading: false,
  });

  const actions = readonly({
    async todos() {
      state.todosLoading = true;

      const response = await request<{ result: TodoItem[]; total: number }>('/todos', {
        method: 'POST',
        body: state.searchForm,
      });

      state.todosLoading = false;
      state.todosRows = response._data?.result || [];
      state.todosCount = response._data?.total || 0;
    },

    initial() {
      actions.todos();
    },

    reset() {
      state.searchForm = { filter: 0 };
      actions.todos();
    },
    search() {
      state.todosControl = { ...state.todosControl, page: 1 };
      state.searchForm = { ...state.searchForm, ...state.todosControl };
      actions.todos();
    },

    changeTodos(control: XTableProps['control']) {
      state.todosControl = control;
      state.searchForm = { ...state.searchForm, ...state.todosControl };
      actions.todos();
    },
    async delete() {
      state.deleteLoading = true;

      const response = await request(`/todos/${state.deleteContent._id}`, {
        method: 'DELETE',
      });

      state.deleteLoading = false;

      if (response.status === 200) {
        state.deleteDialog = false;

        notification.add({
          message: 'Delete successful',
          color: 'success',
        });

        actions.todos();
      }

      if (response.status === 400) {
        notification.add({
          message: 'Delete failed',
          color: 'danger',
        });
      }
    },
  });

  function $reset() {
    state.searchForm = { filter: 0 };
    state.todosLoading = false;
    state.todosRows = [];
    state.todosCount = 0;
    state.todosControl = {};

    state.deleteDialog = false;
    state.deleteExpected = '';
    state.deleteContent = {};
    state.deleteLoading = false;
  }

  return { state, actions, $reset };
});
