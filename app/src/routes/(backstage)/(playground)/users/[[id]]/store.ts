import { reactive } from 'vue';
import { defineStore } from 'vue-storer';
import { useNotification, request } from '@x/ui';

import type { State, User } from './types';

export default defineStore('/users', () => {
  const notification = useNotification();

  const state = reactive<State>({
    usersDialog: false,
    usersFilter: {},
    usersLoading: false,
    usersRows: [],
    usersCount: 0,
    usersControl: {},

    userDialog: false,
    userMode: 'new',
    userForm: {},

    deleteDialog: false,
    deleteExpected: '',
    deleteContent: {},
    deleteLoading: false,
  });

  const getters = reactive({});

  const actions = reactive({
    async users() {
      state.usersLoading = true;

      const response = await request<{ result: User[]; total: number }>('/users', {
        method: 'POST',
        body: state.usersFilter,
      });

      state.usersLoading = false;

      if (response.ok) {
        state.usersRows = response._data?.result || [];
        state.usersCount = response._data?.total || 0;
      }
    },
    initialize() {
      actions.users();
    },

    newUser() {
      if (state.userMode === 'edit') state.userForm = {};
      state.userDialog = true;
    },
    async createUser() {
      const response = await request<any>('/users/new', {
        method: 'POST',
        body: state.userForm,
      });
    },
    async editUser(row: User) {
      const response = await request<any>(`/users/${row._id}`);

      if (response.ok) {
        state.userDialog = true;
        state.userForm = response._data.result;
      }
    },
    async saveUser() {
      const response = await request<any>(`/users/${state.userForm._id}`, {
        method: 'PUT',
        body: state.userForm,
      });
    },
    async suspendUser(row: User) {
      const response = await request<any>(`/users/${row._id}`, {
        method: 'PUT',
        body: { ...row, status: false },
      });
    },
    async activeUser(row: User) {
      const response = await request<any>(`/users/${row._id}`, {
        method: 'PUT',
        body: { ...row, status: true },
      });
    },
    async settingUser(row: User) {
      const response = await request<any>(`/users/${row._id}/settings`);
    },
    async deleteUser() {
      const response = await request(`/users/${state.deleteContent._id}`, { method: 'DELETE' });
    },
  });

  return { state, getters, actions };
});
