import { ref, computed, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

import { defineContext, useFetch } from '~/composables';

import type { State, TodoItem } from './types';

export const stateSymbol = Symbol('/crud-operations');

export const createState = reactive<State>({
  searchConditions: { filter: 0 },

  loading: false,

  dataSource: [],
  dataCount: 0,

  todoItem: {},

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const router = useRouter();
  const state = useState();

  const todosApi = useFetch('/todos').json();

  const todosId = ref<TodoItem['_id']>('');
  const todosApiById = useFetch(computed(() => '/todos/' + todosId.value)).json();

  const actions = {
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
  };

  return actions;
};

export const useComputeds = () => {
  // const state = useState();

  const computeds = {};

  return computeds;
};

export default () => defineContext(stateSymbol, createState);
