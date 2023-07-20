import { ref, computed, reactive, readonly } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'vue-storer';

import { useFetch } from '~/composables';

import type { State, TodoItem } from './types';

export default defineStore('/(library)/data-entry/form-validation', () => {
  const router = useRouter();

  const todosApi = useFetch('/todos').json();

  const todosId = ref<TodoItem['_id']>('');
  const todosApiById = useFetch(computed(() => '/todos/' + todosId.value)).json();

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
      await todosApi.post(state.searchConditions).execute();
      state.loading = false;

      state.dataSource = todosApi.data.value.result;
      state.dataCount = todosApi.data.value.total;
    },
    addToDo() {
      router.push('/crud-operations/new');
    },
    async addNewToDo() {
      todosId.value = 'new';
      await todosApiById.post(state.todoItem).execute();

      if (todosApiById.statusCode.value === 200) {
        router.replace('/crud-operations');
      }
    },
    viewTodo(row: TodoItem) {
      router.push(`/crud-operations/${row._id}`);
    },
    async todoById(id: TodoItem['_id']) {
      todosId.value = id;
      await todosApiById.get().execute();
      state.todoItem = todosApiById.data.value.result;
    },
    async saveToDo() {
      await todosApiById.put(state.todoItem).execute();

      if (todosApiById.statusCode.value === 200) {
        router.replace('/crud-operations');
      }
    },
    async removeToDo() {
      await todosApiById.delete().execute();

      if (todosApiById.statusCode.value === 200) {
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
