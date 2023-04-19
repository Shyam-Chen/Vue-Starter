<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import Checkbox from '~/components/Checkbox.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from '../provider';
import { useCrudOperationsSchema } from '../schema';

const route = useRoute();

const state = useState();
const actions = useActions();

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
  <Breadcrumbs
    :items="[
      { text: 'Playground', disabled: true },
      { text: 'CRUD operations', href: '/crud-operations' },
      { text: 'Todo', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">CRUD Operations - {{ route.params.id }}</div>
  </div>

  <div class="p-6 space-y-4 bg-white dark:slate-800 rounded-lg shadow-lg">
    <div class="grid grid-cols-3">
      <TextField
        v-model:value="state.todoItem.title"
        required
        :errorMessage="state.errors['todoItem.title']"
      >
        Title
      </TextField>
    </div>

    <div class="flex">
      <Checkbox v-model:value="state.todoItem.completed">Completed</Checkbox>
    </div>

    <div class="space-x-4">
      <template v-if="route.params.id === 'new'">
        <Button color="info" @click="schema.validate() && actions.addNewToDo()">Add</Button>
      </template>

      <div v-else class="flex gap-4">
        <Button color="info" @click="schema.validate() && actions.saveToDo()">Save</Button>
        <Button color="danger" @click="actions.removeToDo">Delete</Button>
      </div>
    </div>
  </div>
</template>
