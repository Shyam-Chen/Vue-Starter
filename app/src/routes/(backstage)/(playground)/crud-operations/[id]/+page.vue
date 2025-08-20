<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { XBreadcrumb, XButton, XCard, XCheckbox, XLeaveConfirmation, XProgressBar } from '@x/ui';
import { XTextField } from '@x/ui';
import isEqual from 'lodash/isequal';

import useStore from './store';
import useSchema from './schema';

const route = useRoute();

const { state, actions, $reset } = useStore();
const schema = useSchema();

onMounted(() => actions.initial());
onUnmounted(() => $reset());
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Playground' },
      { text: 'CRUD Operations', to: '/crud-operations' },
      { text: route.params.id === 'new' ? 'Add' : 'Edit' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">
    {{ route.params.id === 'new' ? 'Add' : 'Edit' }}
  </h1>

  <XCard class="my-8 relative">
    <XProgressBar v-if="state.todoLoading" class="absolute inset-0" />

    <h2 class="text-3xl font-bold">Todo Info</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <XTextField
        v-model:value="state.todoForm.title"
        label="Title"
        required
        :invalid="state.todoValdn.title"
      />
      <div></div>

      <XCheckbox v-model:value="state.todoForm.completed">Completed</XCheckbox>
    </div>

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
  </XCard>

  <XLeaveConfirmation :trigger="!isEqual(state.todo, state.todoForm) && !state.todoSent" />
</template>
