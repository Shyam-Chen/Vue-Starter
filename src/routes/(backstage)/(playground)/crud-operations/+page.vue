<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { XBreadcrumb, XPanel, XTooltip } from '@x/ui';

import TextField from '~/components/TextField.vue';
import RadioGroup from '~/components/RadioGroup.vue';
import Checkbox from '~/components/Checkbox.vue';
import Table from '~/components/Table.vue';
import Button from '~/components/Button.vue';

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

  <div class="my-4">
    <div class="text-3xl font-bold">CRUD Operations</div>
  </div>

  <XPanel class="mb-6">
    <template #header>
      <div class="text-lg font-bold">Search Conditions</div>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-5 mb-6">
        <TextField v-model:value="state.searchConditions.title" label="Title" />

        <RadioGroup
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
        <Button color="secondary" @click="state.searchConditions = { filter: 0 }">Reset</Button>
        <Button @click="actions.searchTodos">Search</Button>
      </div>
    </template>
  </XPanel>

  <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
    <div class="flex justify-between p-4">
      <div class="text-3xl font-bold">Todo List</div>

      <Button color="primary" @click="actions.addToDo">Add</Button>
    </div>

    <Table
      stickyHeader
      :columns="flux.columns"
      :rows="state.dataSource"
      :count="state.dataCount"
      :loading="state.loading"
      @change="actions.changeTodos"
    >
      <template #completed="{ row }">
        <Checkbox v-model:value="row.completed" readonly />
      </template>

      <template #actions="{ row }">
        <div class="space-x-4">
          <XTooltip title="Detail">
            <Button variant="text" color="info" icon="i-bx-detail" @click="actions.viewTodo(row)" />
          </XTooltip>
        </div>
      </template>
    </Table>
  </div>
</template>
