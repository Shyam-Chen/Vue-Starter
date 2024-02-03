import { reactive, readonly } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'vue-storer';
import { request } from '@x/ui';

import type { State, TodoItem } from './types';

export default defineStore('/crud-operations/:id', () => {
  const router = useRouter();
  const route = useRoute();

  const state = reactive<State>({
    todoLoading: false,
    todoForm: {},
    todoValdn: {},
    todoSending: false,
    todoSent: false,
  });

  const actions = readonly({
    async todo() {
      state.todoLoading = true;
      const response = await request<{ result: TodoItem }>(`/todos/${route.params.id}`);
      state.todoLoading = false;
      state.todoForm = response._data?.result || {};
    },

    initial() {
      actions.todo();
    },

    async add() {
      state.todoSending = true;

      const response = await request('/todos/new', {
        method: 'POST',
        body: state.todoForm,
      });

      state.todoSending = false;

      if (response.status === 200) {
        state.todoSent = true;
        router.replace('/crud-operations');
      }
    },
    async save() {
      state.todoSending = true;

      const response = await request(`/todos/${state.todoForm._id}`, {
        method: 'PUT',
        body: state.todoForm,
      });

      state.todoSending = false;

      if (response.status === 200) {
        router.replace('/crud-operations');
      }
    },
  });

  return { state, actions };
});
