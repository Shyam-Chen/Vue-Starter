<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterLink, onBeforeRouteLeave } from 'vue-router';
import {
  XBreadcrumb,
  XPanel,
  XTextField,
  XRadioGroup,
  XButton,
  XTable,
  XCheckbox,
  XTooltip,
  XDeleteConfirmation,
} from '@x/ui';

import useStore from './store';

const { state, actions, $reset } = useStore();

onMounted(() => actions.initial());

onBeforeRouteLeave((to, from) => {
  if (!to.path.startsWith(from.path)) {
    $reset();
  }
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'CRUD Operations' }]" />

  <h1 class="text-4xl font-extrabold my-4">CRUD Operations</h1>

  <XPanel class="my-8">
    <template #header>Search Conditions</template>

    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <XTextField v-model:value="state.searchForm.title" label="Title" />

        <XRadioGroup
          v-model:value="state.searchForm.filter"
          label="Filter"
          :options="[
            { label: 'All', value: 0 },
            { label: 'Active', value: 1 },
            { label: 'Completed', value: 2 },
          ]"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-6">
        <div class="place-self-end">
          <XButton
            prepend="i-material-symbols-restart-alt-rounded"
            label="Reset"
            color="secondary"
            @click="actions.reset"
          />
        </div>

        <div>
          <XButton
            prepend="i-material-symbols-search-rounded"
            label="Search"
            @click="actions.search"
          />
        </div>
      </div>
    </template>
  </XPanel>

  <div class="w-full bg-white dark:bg-slate-800 shadow rounded-md">
    <div class="flex justify-between p-4 lg:p-6">
      <h2 class="text-3xl font-bold">Todo List</h2>

      <RouterLink to="/crud-operations/new">
        <XButton prepend="i-material-symbols-add-rounded" label="Add" />
      </RouterLink>
    </div>

    <XTable
      :loading="state.todosLoading"
      :columns="[
        { key: '_id', name: 'Identifier' },
        { key: 'title', name: 'Title' },
        { key: 'completed', name: 'Completed' },
        { key: 'actions', name: 'Actions', sortable: false },
      ]"
      :rows="state.todosRows"
      :count="state.todosCount"
      :control="state.todosControl"
      @change="actions.changeTodos"
    >
      <template #completed="{ row }">
        <XCheckbox v-model:value="row.completed" readonly />
      </template>

      <template #actions="{ row }">
        <div class="flex gap-2">
          <XTooltip title="Edit">
            <RouterLink :to="`/crud-operations/${row._id}`">
              <XButton
                icon="i-material-symbols-edit-rounded"
                variant="text"
                color="info"
                size="small"
              />
            </RouterLink>
          </XTooltip>

          <XTooltip title="Delete">
            <XButton
              icon="i-material-symbols-delete-rounded"
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

  <XDeleteConfirmation
    v-model="state.deleteDialog"
    v-model:expected="state.deleteExpected"
    :received="state.deleteContent.title"
    :loading="state.deleteLoading"
    @delete="actions.delete"
  />
</template>
