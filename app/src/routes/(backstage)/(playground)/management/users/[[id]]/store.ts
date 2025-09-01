import { request, useNotification } from '@x/ui';
import { reactive } from 'vue';
import { defineStore } from 'vue-storer';

import type { State, User } from './types';

export default defineStore('/management/users', () => {
  const notification = useNotification();

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
      { resource: 'dashboard', operations: [] },
      {
        resource: 'library',
        operations: [],
        children: [
          { resource: 'overview', operations: [] },
          { resource: 'general', operations: [] },
          {
            resource: 'dataEntry',
            operations: [],
            children: [
              {
                resource: 'selects',
                operations: [],
                children: [
                  { resource: 'select', operations: [] },
                  { resource: 'multiselect', operations: [] },
                  { resource: 'treeSelect', operations: [] },
                ],
              },
            ],
          },
        ],
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
      const response = await request<any>('/users/new', {
        method: 'POST',
        body: {
          ...state.userForm,
          permissions: state.permissions,
        },
      });

      if (response.ok) {
        notification.actions.add({
          message: 'OK',
          color: 'success',
        });
      }
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
    async resetUserPassword(row: User) {
      await request<any>(`/users/${row._id}/password-reset`);
    },
    async resetUser2fa(row: User) {
      await request<any>(`/users/${row._id}/2fa-reset`);
    },
    async deleteUser() {
      await request(`/users/${state.deleteContent._id}`, { method: 'DELETE' });
    },
  });

  return { state, getters, actions };
});
