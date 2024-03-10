import { useNotification, request } from '@lyra/ui';
import { reactive, readonly, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';

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

        notification.add({
          message: 'Add successful',
          color: 'success',
        });

        router.replace('/crud-operations');
      }

      if (response.status === 400) {
        notification.add({
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

        notification.add({
          message: 'Edit successful',
          color: 'success',
        });

        router.replace('/crud-operations');
      }

      if (response.status === 400) {
        notification.add({
          message: 'Edit failed',
          color: 'danger',
        });
      }
    },
  });
  function $reset() {
    state.todo = {};
    state.todoLoading = false;
    state.todoForm = {};
    state.todoValdn = {};
    state.todoSending = false;
    state.todoSent = false;
  }
  return { state, actions, $reset };
});
