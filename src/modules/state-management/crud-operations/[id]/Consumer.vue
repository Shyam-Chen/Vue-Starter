<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import Checkbox from '~/components/Checkbox.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from '../provider';

const route = useRoute();

const state = useState();
const actions = useActions();

onMounted(() => {
  actions.todoById(route.params.id as string);
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'State management', disabled: true },
      { text: 'CRUD operations', href: '/state-management/crud-operations' },
      { text: 'Todo', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">CRUD Operations - {{ route.params.id }}</div>
  </div>

  <div class="p-6 space-y-4 bg-white rounded-lg shadow-lg">
    <div class="grid grid-cols-3">
      <TextField v-model:value="state.todoItem.title">Title</TextField>
    </div>

    <Checkbox v-model:value="state.todoItem.completed">Completed</Checkbox>

    <div class="space-x-4">
      <Button color="info" @click="actions.saveToDo">Save</Button>
      <Button color="danger" @click="actions.removeToDo">Delete</Button>
    </div>
  </div>
</template>
