<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ExpansionPanel from '~/components/ExpansionPanel.vue';
import TextField from '~/components/TextField.vue';
import RadioGroup from '~/components/RadioGroup.vue';
import Checkbox from '~/components/Checkbox.vue';
import Table from '~/components/Table.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from './provider';

const state = useState();
const actions = useActions();

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
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'State management', disabled: true },
      { text: 'CRUD operations', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">CRUD Operations</div>
  </div>

  <ExpansionPanel class="mb-6">
    <template #header>
      <div class="flex">
        <div class="text-lg font-bold">Search Conditions</div>
        <div class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
      </div>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-5 mb-6">
        <div><TextField v-model:value="state.searchConditions.title">Title</TextField></div>

        <div class="flex flex-col">
          <div class="text-sm mb-2 font-bold">Filter</div>

          <div class="flex items-center h-full">
            <RadioGroup
              v-model:value="state.searchConditions.filter"
              :options="[
                { label: 'All', value: 0 },
                { label: 'Active', value: 1 },
                { label: 'Completed', value: 2 },
              ]"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <Button color="secondary" @click="state.searchConditions = { filter: 0 }">Reset</Button>
        <Button @click="actions.searchTodos">Search</Button>
      </div>
    </template>
  </ExpansionPanel>

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
      @change="actions.changeTodos"
    >
      <template #completed="{ row }">
        <Checkbox v-model:value="row.completed" readonly />
      </template>

      <template #actions="{ row }">
        <div class="space-x-4">
          <Button variant="text" color="info" icon="i-bx-detail" @click="actions.viewTodo(row)" />
        </div>
      </template>
    </Table>
  </div>
</template>
