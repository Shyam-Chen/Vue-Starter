<script lang="ts" setup>
import { onMounted } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import Checkbox from '~/components/Checkbox.vue';
import Button from '~/components/Button.vue';

import { useState, useActions } from '../provider';

const state = useState();
const actions = useActions();

onMounted(() => {
  state.todoItem = {};
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'State management', disabled: true },
      { text: 'CRUD operations', href: '/state-management/crud-operations' },
      { text: 'Add new', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">CRUD Operations - Add new</div>
  </div>

  <div class="p-6 space-y-4 bg-white rounded-lg shadow-lg">
    <div class="grid grid-cols-3">
      <TextField v-model:value="state.todoItem.title">Title</TextField>
    </div>

    <Checkbox v-model:value="state.todoItem.completed">Completed</Checkbox>

    <div>
      <Button color="info" @click="actions.addNewToDo">Add</Button>
    </div>
  </div>
</template>
