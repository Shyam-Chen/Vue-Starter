<script lang="ts" setup>
import { onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { XBreadcrumb, XCard, XTextField, XCheckbox, XButton } from '@x/ui';

import useStore from './store';
import useSchema from './schema';

const route = useRoute();

const { state, actions, $reset } = useStore();
const schema = useSchema();

onMounted(() => {
  if (route.params.id === 'new') {
    state.todoForm = {};
  } else {
    actions.todo();
  }
});

onBeforeMount(() => {
  $reset();
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Playground' },
      { text: 'CRUD operations', to: '/crud-operations' },
      { text: 'Todo' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">CRUD Operations - {{ route.params.id }}</h1>

  <XCard class="my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <XTextField
        v-model:value="state.todoForm.title"
        label="Title"
        required
        :invalid="state.todoValdn.title"
      />
      <div></div>

      <XCheckbox v-model:value="state.todoForm.completed">Completed</XCheckbox>
    </div>

    <div class="mt-6">
      <XButton
        v-if="route.params.id === 'new'"
        prepend="i-material-symbols-add-rounded"
        label="Add"
        :loading="state.todoSending"
        @click="schema.validate() && actions.add()"
      />
      <XButton
        v-else
        prepend="i-material-symbols-save-rounded"
        label="Save"
        :loading="state.todoSending"
        @click="schema.validate() && actions.save()"
      />
    </div>
  </XCard>
</template>
