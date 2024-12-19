<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { XBreadcrumb, XButton, XCheckboxGroup, XChip, XDialog, XFormControl } from '@x/ui';
import { XRadioGroup, XTable, XTextField, XTooltip, request } from '@x/ui';

import useLocale from './locales';

const router = useRouter();
const route = useRoute();

const locale = useLocale();

const loading = ref(false);
const users = ref<any[]>([]);
const total = ref(0);

const flux = reactive({
  userDialog: false,
  addUser() {
    router.push('/user-list/new');
    flux.userForm = {};
  },
  userForm: {} as any,
  async viewUser(user: any) {
    const response = await request<any>(`/user-list/${user._id}`, { method: 'GET' });
    router.push(`/user-list/${response._data.result._id}`);
    flux.userForm = response._data.result;
  },
});

watch(
  () => flux.userDialog,
  (val) => {
    if (!val) {
      router.push('/user-list');
    }
  },
);

watch(
  () => route.params.id,
  (val) => {
    flux.userDialog = Boolean(val);
  },
  { immediate: true },
);

onMounted(async () => {
  loading.value = true;
  const response = await request<any>('/user-list', { method: 'POST', body: {} });
  loading.value = false;
  users.value = response._data.result;
  total.value = response._data.total;
});

const permissions = ref<any[]>([
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
]);

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
    { label: 'Delete', value: 'delete' },
  ],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Management' }, { text: 'Users' }]" />

  <h1 class="text-4xl font-extrabold my-4">Users</h1>

  <div class="w-full bg-white dark:bg-slate-800 shadow rounded-md">
    <div class="flex justify-between p-4 lg:p-6">
      <h2 class="text-3xl font-bold">User List</h2>
      <XButton prepend="i-material-symbols-add-rounded" label="Add" @click="flux.addUser" />
    </div>

    <XTable
      :columns="[
        { key: 'username', name: 'Username' },
        { key: 'fullName', name: 'Full Name' },
        { key: 'email', name: 'Email' },
        { key: 'status', name: 'Status' },
        { key: 'actions', name: 'Actions', sortable: false },
      ]"
      :loading="loading"
      :rows="users"
      :count="total"
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
              @click="flux.viewUser(row)"
            />
          </XTooltip>

          <XTooltip v-if="row.status" title="Suspend">
            <XButton
              icon="i-mdi-user-block"
              variant="text"
              color="danger"
              size="small"
              @click="flux.viewUser(row)"
            />
          </XTooltip>
          <XTooltip v-else title="Active">
            <XButton
              icon="i-mdi-user-check"
              variant="text"
              color="success"
              size="small"
              @click="flux.viewUser(row)"
            />
          </XTooltip>

          <XTooltip title="Authentication">
            <XButton
              icon="i-mdi-user-access-control"
              variant="text"
              color="warning"
              size="small"
              @click="flux.viewUser(row)"
            />
          </XTooltip>
        </div>
      </template>
    </XTable>
  </div>

  <XDialog v-model="flux.userDialog">
    <div class="grid">
      <div class="text-xl font-bold mb-4">Add</div>

      <form class="space-y-5 mb-8">
        <XTextField v-model:value="flux.userForm.username" label="Username" required />
        <XTextField v-model:value="flux.userForm.email" label="Email" required />
        <XTextField v-model:value="flux.userForm.fullName" label="Full Name" required />

        <XRadioGroup
          v-model:value="flux.userForm.role"
          label="Role"
          :options="[
            { label: 'Viewer', value: 'viewer' },
            { label: 'Editor', value: 'editor' },
            { label: 'Admin', value: 'admin' },
            { label: 'Custom', value: 'custom' },
          ]"
          required
        />

        <XFormControl v-if="flux.userForm.role === 'custom'" label="Permissions" required>
          <div class="flex flex-col w-full divide-y divide-gray-300 dark:divide-gray-600">
            <div
              v-for="permission in permissions"
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
      </form>

      <div class="flex justify-end gap-4">
        <XButton variant="outlined" color="secondary" @click="flux.userDialog = false">
          Cancel
        </XButton>
        <XButton>Add</XButton>
      </div>
    </div>
  </XDialog>
</template>
