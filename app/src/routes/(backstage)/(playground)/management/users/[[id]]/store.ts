import { reactive } from 'vue';
import { defineStore } from 'vue-storer';
import { request } from '@x/ui';

import type { State, User } from './types';

export default defineStore('/management/users', () => {
  const state = reactive<State>({
    usersDialog: false,
    usersFilter: {},
    usersFiltered: {},
    usersLoading: false,
    usersRows: [],
    usersCount: 0,
    usersControl: {},

    userDialog: false,
    userMode: 'new',
    userLoading: false,
    userForm: {},
    userValdn: {},
    userTouched: {},
    permissions: [
      {
        resource: 'library',
        operations: [],
        children: [{ resource: 'overview', operations: ['read'] }],
      },
      {
        resource: 'playground',
        operations: [],
        children: [
          { resource: 'counter', operations: [] },
          { resource: 'crudOperations', operations: [] },
          {
            resource: 'management',
            operations: [],
            children: [
              { resource: 'groups', operations: [] },
              { resource: 'users', operations: [] },
            ],
          },
        ],
      },
    ],

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

    filterUsers() {
      state.usersFiltered = { ...state.usersFilter };
      state.usersDialog = false;
    },

    changeFeatureGroup(permission: any) {
      if (!permission.operations.includes('read')) {
        // ...
      }
    },
    changePrimaryFeature() {
      //
    },
    changeSecondaryFeature() {
      //
    },
    changeTertiaryFeature() {
      //
    },

    newUser() {
      if (state.userMode === 'edit') state.userForm = {};
      state.userDialog = true;
      state.userMode = 'new';
    },
    async createUser() {
      await request<any>('/users/new', {
        method: 'POST',
        body: state.userForm,
      });
    },
    async editUser(row: User) {
      state.userDialog = true;
      state.userMode = 'edit';
      state.userLoading = true;

      const response = await request<any>(`/users/${row._id}`);

      state.userLoading = false;

      if (response.ok) {
        state.userForm = response._data.result;
      }
    },
    async saveUser() {
      await request<any>(`/users/${state.userForm._id}`, {
        method: 'PUT',
        body: state.userForm,
      });
    },
    async suspendUser(row: User) {
      await request<any>(`/users/${row._id}`, {
        method: 'PUT',
        body: { ...row, status: false },
      });
    },
    async activeUser(row: User) {
      await request<any>(`/users/${row._id}`, {
        method: 'PUT',
        body: { ...row, status: true },
      });
    },
    async settingUser(row: User) {
      await request<any>(`/users/${row._id}/settings`);
    },
    async deleteUser() {
      await request(`/users/${state.deleteContent._id}`, { method: 'DELETE' });
    },
  });

  return { state, getters, actions };
});
