<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import {
  XBreadcrumb,
  XPanel,
  XTextField,
  XRadioGroup,
  XCheckbox,
  XTooltip,
  XTable,
  XButton,
} from '@x/ui';

import useStore from './store';

const { state, actions } = useStore();

const flux = reactive({
  columns: [
    { key: '_id', name: 'Identifier' },
    { key: 'title', name: 'Title' },
    { key: 'completed', name: 'Completed' },
    { key: 'actions', name: 'Actions', sortable: false },
  ],
});

onMounted(() => {
  actions.todosList();
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'CRUD Operations' }]" />

  <h1 class="text-4xl font-extrabold my-4">CRUD Operations</h1>

  <XPanel class="mb-6">
    <template #header>
      <div class="text-lg font-bold">Search Conditions</div>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-5 mb-6">
        <XTextField v-model:value="state.searchConditions.title" label="Title" />

        <XRadioGroup
          v-model:value="state.searchConditions.filter"
          label="Filter"
          :options="[
            { label: 'All', value: 0 },
            { label: 'Active', value: 1 },
            { label: 'Completed', value: 2 },
          ]"
        />
      </div>

      <div class="flex justify-center gap-4">
        <XButton color="secondary" @click="state.searchConditions = { filter: 0 }">Reset</XButton>
        <XButton @click="actions.searchTodos">Search</XButton>
      </div>
    </template>
  </XPanel>

  <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
    <div class="flex justify-between p-4">
      <div class="text-3xl font-bold">Todo List</div>

      <XButton color="primary" @click="actions.addToDo">Add</XButton>
    </div>

    <XTable
      stickyHeader
      :columns="flux.columns"
      :rows="state.dataSource"
      :count="state.dataCount"
      :loading="state.loading"
      @change="actions.changeTodos"
    >
      <template #completed="{ row }">
        <XCheckbox v-model:value="row.completed" readonly />
      </template>

      <template #actions="{ row }">
        <div class="space-x-4">
          <XTooltip title="Detail">
            <XButton
              variant="text"
              color="info"
              icon="i-bx-detail"
              @click="actions.viewTodo(row)"
            />
          </XTooltip>
        </div>
      </template>
    </XTable>
  </div>
</template>
