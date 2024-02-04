import { reactive, readonly, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'vue-storer';
import { useNotification } from '@x/ui';
import { request } from '@x/ui';

import type { State, TodoItem } from './types';

export default defineStore('/crud-operations/:id', () => {
  const router = useRouter();
  const route = useRoute();
  const notification = useNotification();

  const state = reactive<State>({
    todo: {},
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
      state.todo = structuredClone(toRaw(state.todoForm));
    },

    initial() {
      if (route.params.id === 'new') {
        state.todoForm = {};
      } else {
        actions.todo();
      }
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

        notification.actions.add({
          message: 'Add successful',
          color: 'success',
        });

        router.replace('/crud-operations');
      }

      if (response.status === 400) {
        notification.actions.add({
          message: 'Add failed',
          color: 'danger',
        });
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
        state.todoSent = true;

        notification.actions.add({
          message: 'Edit successful',
          color: 'success',
        });

        router.replace('/crud-operations');
      }

      if (response.status === 400) {
        notification.actions.add({
          message: 'Edit failed',
          color: 'danger',
        });
      }
    },
  });

  return { state, actions };
});
