<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ExpansionPanel from '~/components/ExpansionPanel.vue';
import TextField from '~/components/TextField.vue';
import Checkbox from '~/components/Checkbox.vue';
import DataTable from '~/components/DataTable.vue';
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
      { text: 'Platform', disabled: true },
      { text: 'State management', disabled: true },
      { text: 'CRUD operations', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">CRUD Operations</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <ExpansionPanel class="mb-6">
      <template #header>
        <div class="text-2xl font-bold">Search Conditions</div>
      </template>

      <template #content>
        <div class="space-y-4">
          <div class="grid grid-cols-3">
            <TextField v-model:value="state.searchConditions.title">Title</TextField>
          </div>

          <Checkbox v-model:value="state.searchConditions.completed">Completed</Checkbox>

          <div>
            <Button color="info" @click="actions.searchTodos">Search</Button>
            <Button color="warning" class="ml-4" @click="state.searchConditions = {}">Clear</Button>
          </div>
        </div>
      </template>
    </ExpansionPanel>

    <DataTable
      title="Todos"
      :columns="flux.columns"
      :dataSource="state.dataSource"
      :dataCount="state.dataCount"
      @add="actions.addToDo"
      @change="actions.changeTodos"
    >
      <template #completed="{ item }">
        <Checkbox v-model:value="item.completed" disabled />
      </template>

      <template #actions="{ item }">
        <div class="space-x-4">
          <Button color="success" @click="actions.viewTodo(item)">View</Button>
        </div>
      </template>
    </DataTable>
  </div>
</template>
