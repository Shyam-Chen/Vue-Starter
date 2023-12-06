<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { XBreadcrumb, XTextField, XCheckbox, XButton } from '@x/ui';

import useStore from '../store';
import { useCrudOperationsSchema } from '../schema';

const route = useRoute();

const { state, actions } = useStore();
const schema = useCrudOperationsSchema();

onMounted(() => {
  if (route.params.id === 'new') {
    state.todoItem = {};
  } else {
    actions.todoById(route.params.id as string);
  }
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Playground' },
      { text: 'CRUD operations', href: '/crud-operations' },
      { text: 'Todo' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">CRUD Operations - {{ route.params.id }}</div>
  </div>

  <div class="p-6 space-y-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
    <div class="grid grid-cols-3">
      <XTextField v-model:value="state.todoItem.title" required :invalid="state.errors.title">
        Title
      </XTextField>
    </div>

    <div class="flex">
      <XCheckbox v-model:value="state.todoItem.completed">Completed</XCheckbox>
    </div>

    <div class="space-x-4">
      <template v-if="route.params.id === 'new'">
        <XButton color="info" @click="schema.validate() && actions.addNewToDo()">Add</XButton>
      </template>

      <div v-else class="flex gap-4">
        <XButton color="info" @click="schema.validate() && actions.saveToDo()">Save</XButton>
        <XButton color="danger" @click="actions.removeToDo">Delete</XButton>
      </div>
    </div>
  </div>
</template>
