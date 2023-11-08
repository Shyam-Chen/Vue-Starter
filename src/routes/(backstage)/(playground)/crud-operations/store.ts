import { reactive, readonly } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'vue-storer';
import { request } from '@x/ui';

import type { State, TodoItem } from './types';

export default defineStore('/(library)/data-entry/form-validation', () => {
  const router = useRouter();

  const state = reactive<State>({
    searchConditions: { filter: 0 },

    loading: false,

    dataSource: [],
    dataCount: 0,

    todoItem: {},

    errors: {},
  });

  const actions = readonly({
    searchTodos() {
      actions.todosList();
    },
    async todosList() {
      state.loading = true;
      const response = await request('/todos', { method: 'POST', body: state.searchConditions });
      state.loading = false;

      state.dataSource = response._data.result;
      state.dataCount = response._data.total;
    },
    addToDo() {
      router.push('/crud-operations/new');
    },
    async addNewToDo() {
      const response = await request('/todos/new', {
        method: 'POST',
        body: state.todoItem,
      });

      if (response.status === 200) {
        router.replace('/crud-operations');
      }
    },
    viewTodo(row: TodoItem) {
      router.push(`/crud-operations/${row._id}`);
    },
    async todoById(id: TodoItem['_id']) {
      const response = await request(`/todos/${id}`);
      state.todoItem = response._data.result;
    },
    async saveToDo() {
      const response = await request(`/todos/${state.todoItem._id}`, {
        method: 'PUT',
        body: state.todoItem,
      });

      if (response.status === 200) {
        router.replace('/crud-operations');
      }
    },
    async removeToDo() {
      const response = await request(`/todos/${state.todoItem._id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        router.replace('/crud-operations');
      }
    },
    async changeTodos(tableControl: any) {
      state.searchConditions = {
        ...state.searchConditions,
        ...tableControl,
      };

      await actions.todosList();
    },
  });

  return { state, actions };
});
