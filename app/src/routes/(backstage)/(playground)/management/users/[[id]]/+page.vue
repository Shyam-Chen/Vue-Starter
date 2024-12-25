<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { XBreadcrumb, XButton, XCheckboxGroup, XChip, XDeleteConfirmation, XDialog } from '@x/ui';
import { XFormControl, XRadioGroup, XTable, XTextField, XTooltip, XSkeleton } from '@x/ui';

import useStore from './store';
import useSchema from './schema';
import useLocale from './locales';

const router = useRouter();
const route = useRoute();

const { state, actions, $reset } = useStore();
const schema = useSchema();
const locale = useLocale();

onMounted(() => {
  actions.initialize();
  schema.run();
});

onUnmounted(() => $reset());

watch(
  () => state.userDialog,
  (val) => {
    if (!val) {
      schema.rerun();
      router.push('/management/users');
    }
  },
);

watch(
  () => route.params.id,
  (val) => {
    state.userDialog = !!val;
  },
  { immediate: true },
);

const options = ref({
  library: [{ label: 'Read', value: 'read' }],
  'library.overview': [{ label: 'Read', value: 'read' }],
  playground: [{ label: 'Read', value: 'read' }],
  'playground.counter': [{ label: 'Read', value: 'read' }],
  'playground.crudOperations': [
    { label: 'Read', value: 'read' },
    { label: 'Create', value: 'create' },
    { label: 'Update', value: 'update' },
    { label: 'Delete', value: 'delete' },
  ],
  'playground.management': [{ label: 'Read', value: 'read' }],
  'playground.management.groups': [
    { label: 'Read', value: 'read' },
    { label: 'Create', value: 'create' },
    { label: 'Update', value: 'update' },
    { label: 'Delete', value: 'delete' },
  ],
  'playground.management.users': [
    { label: 'Read', value: 'read' },
    { label: 'Create', value: 'create' },
    { label: 'Suspend', value: 'suspend' },
    { label: 'Active', value: 'active' },
    { label: 'Settings', value: 'settings' },
    { label: 'Delete', value: 'delete' },
  ],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Management' }, { text: 'Users' }]" />

  <h1 class="text-4xl font-extrabold my-4">Users</h1>

  <div class="w-full bg-white dark:bg-slate-800 shadow rounded-md">
    <div class="flex justify-between p-4">
      <XButton
        prepend="i-mdi-filter-outline"
        label="Filter"
        variant="outlined"
        color="info"
        @click="state.usersDialog = true"
      />

      <XButton prepend="i-mdi-add" label="New" @click="actions.newUser()" />
    </div>

    <div class="mx-4 mb-4 flex flex-wrap gap-2 empty:hidden">
      <div v-if="typeof state.usersFiltered.username === 'string'" class="flex-none">
        <XChip
          color="info"
          closable
          @close="
            state.usersFilter.username = undefined;
            actions.filterUsers();
          "
        >
          Username: {{ state.usersFiltered.username }}
        </XChip>
      </div>
    </div>

    <XTable
      v-model:control="state.usersControl"
      :columns="[
        { key: 'username', name: 'Username' },
        { key: 'fullName', name: 'Full Name' },
        { key: 'email', name: 'Email' },
        { key: 'status', name: 'Status' },
        { key: 'actions', name: 'Actions', sortable: false },
      ]"
      :loading="state.usersLoading"
      :rows="state.usersRows"
      :count="state.usersCount"
    >
      <template #status="{ row }">
        <XChip
          :color="
            row.status ? (!row.otpEnabled || !row.otpVerified ? 'warning' : 'success') : 'danger'
          "
          >{{
            row.status ? (!row.otpEnabled || !row.otpVerified ? 'Pending' : 'Active') : 'Suspended'
          }}</XChip
        >
      </template>

      <template #actions="{ row }">
        <div class="flex gap-2">
          <XTooltip title="Edit">
            <XButton
              icon="i-mdi-edit"
              variant="text"
              color="info"
              size="small"
              @click="actions.editUser(row)"
            />
          </XTooltip>

          <XTooltip v-if="row.status" title="Suspend">
            <XButton
              icon="i-mdi-user-block"
              variant="text"
              color="danger"
              size="small"
              @click="actions.suspendUser(row)"
            />
          </XTooltip>
          <XTooltip v-else title="Active">
            <XButton
              icon="i-mdi-user-check"
              variant="text"
              color="success"
              size="small"
              @click="actions.activeUser(row)"
            />
          </XTooltip>

          <XTooltip title="Settings">
            <XButton
              icon="i-mdi-settings"
              variant="text"
              color="warning"
              size="small"
              @click="actions.settingUser(row)"
            />
          </XTooltip>

          <XTooltip title="Delete">
            <XButton
              icon="i-mdi-delete"
              variant="text"
              color="danger"
              size="small"
              @click="
                state.deleteDialog = true;
                state.deleteContent = row;
              "
            />
          </XTooltip>
        </div>
      </template>
    </XTable>
  </div>

  <XDialog v-model="state.usersDialog" title="Filter">
    <div class="grid md:grid-cols-2 gap-4">
      <XTextField v-model:value="state.usersFilter.username" label="Username" />
    </div>

    <div class="flex justify-end gap-4 mt-6">
      <XButton
        prepend="i-mdi-keyboard-return"
        label="Cancel"
        variant="outlined"
        color="secondary"
        @click="state.usersDialog = false"
      />
      <XButton
        prepend="i-mdi-target"
        label="Apply"
        :loading="state.usersLoading"
        @click="actions.filterUsers()"
      />
    </div>
  </XDialog>

  <XDialog
    v-model="state.userDialog"
    :title="state.userMode === 'new' ? 'Create' : state.userMode === 'edit' ? 'Edit' : ''"
  >
    <div v-if="state.userLoading" class="flex flex-col gap-4">
      <div v-for="num in 3" :key="num" class="w-full">
        <XSkeleton class="w-16 h-5 mb-1" />
        <XSkeleton class="w-full h-9.5" />
      </div>

      <div class="w-full">
        <XSkeleton class="w-16 h-5 mb-1" />
        <XSkeleton class="w-1/2 h-9.5" />
      </div>
    </div>

    <div v-else class="flex flex-col gap-4">
      <XTextField
        v-model:value="state.userForm.username"
        label="Username"
        required
        :invalid="state.userValdn.username"
        :disabled="state.userMode === 'edit'"
        @blur="state.userTouched.username = true"
      />
      <XTextField
        v-model:value="state.userForm.email"
        label="Email"
        required
        :invalid="state.userValdn.email"
        :disabled="state.userMode === 'edit'"
        @blur="state.userTouched.email = true"
      />
      <XTextField v-model:value="state.userForm.fullName" label="Full Name" />

      <XRadioGroup
        v-model:value="state.userForm.role"
        label="Role"
        :options="[
          { label: 'Viewer', value: 'viewer' },
          { label: 'Editor', value: 'editor' },
          { label: 'Admin', value: 'admin' },
          { label: 'Custom', value: 'custom' },
        ]"
        required
      />

      <XFormControl v-if="state.userForm.role === 'custom'" label="Permissions" required>
        <div class="flex flex-col w-full divide-y divide-gray-300 dark:divide-gray-600">
          <div
            v-for="permission in state.permissions"
            :key="permission.resource"
            class="w-full divide-y divide-gray-300 dark:divide-gray-600"
          >
            <div
              class="grid grid-cols-4 text-zinc-600 dark:text-zinc-400 bg-gray-200 dark:bg-gray-700 px-4"
            >
              <div class="flex items-center">
                {{ locale[permission.resource as keyof typeof locale] }}
              </div>
              <div class="col-span-3">
                <XCheckboxGroup
                  v-model:value="permission.operations"
                  :options="options[permission.resource as keyof typeof options]"
                  @change="actions.changeFeatureGroup(permission)"
                />
              </div>
            </div>

            <div
              v-if="permission.children?.length"
              class="w-full divide-y divide-gray-300 dark:divide-gray-600"
            >
              <div
                v-for="subPermission in permission.children"
                :key="subPermission.resource"
                class="w-full divide-y divide-gray-300 dark:divide-gray-600"
              >
                <div class="grid grid-cols-4 px-4">
                  <div class="flex items-center ps-4">
                    {{ locale[subPermission.resource as keyof typeof locale] }}
                  </div>
                  <div class="col-span-3">
                    <XCheckboxGroup
                      v-model:value="subPermission.operations"
                      :options="
                        options[
                          `${permission.resource}.${subPermission.resource}` as keyof typeof options
                        ]
                      "
                    />
                  </div>
                </div>

                <div
                  v-if="subPermission.children?.length"
                  class="w-full divide-y divide-gray-300 dark:divide-gray-600"
                >
                  <div
                    v-for="subSubPermission in subPermission.children"
                    :key="subSubPermission.resource"
                  >
                    <div class="grid grid-cols-4 px-4">
                      <div class="flex items-center ps-8">
                        {{ locale[subSubPermission.resource as keyof typeof locale] }}
                      </div>
                      <div class="col-span-3">
                        <XCheckboxGroup
                          v-model:value="subSubPermission.operations"
                          :options="
                            options[
                              `${permission.resource}.${subPermission.resource}.${subSubPermission.resource}` as keyof typeof options
                            ]
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </XFormControl>
    </div>

    <div class="flex justify-end gap-4 mt-6">
      <XButton
        prepend="i-mdi-keyboard-return"
        label="Cancel"
        variant="outlined"
        color="secondary"
        @click="state.userDialog = false"
      />
      <XButton
        v-if="state.userMode === 'new'"
        prepend="i-mdi-add"
        label="Create"
        :disabled="state.userLoading"
        @click="schema.validate() && actions.createUser()"
      />
      <XButton
        v-if="state.userMode === 'edit'"
        prepend="i-mdi-content-save"
        label="Save"
        :disabled="state.userLoading"
        @click="actions.saveUser()"
      />
    </div>
  </XDialog>

  <XDeleteConfirmation
    v-model="state.deleteDialog"
    v-model:expected="state.deleteExpected"
    :received="state.deleteContent.username"
    :loading="state.deleteLoading"
    @delete="actions.deleteUser()"
  />
</template>
