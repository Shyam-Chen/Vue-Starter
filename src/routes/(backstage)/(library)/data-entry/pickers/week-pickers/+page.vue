<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import WeekPicker from '~/components/WeekPicker.vue';

const flux = reactive({
  weekPicker: [],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'WeekPicker' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">WeekPicker</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <WeekPicker v-model:value="flux.weekPicker" />
    </div>

    <div class="mt-2">{{ flux.weekPicker }}</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Label</div>

    <div class="flex justify-center">
      <WeekPicker v-model:value="flux.weekPicker" label="Label" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <WeekPicker v-model:value="flux.weekPicker" label="Label" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors</div>

    <div class="flex justify-center">
      <WeekPicker v-model:value="flux.weekPicker" :errorMessage="'This is a required field'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors with Label</div>

    <div class="flex justify-center">
      <WeekPicker
        v-model:value="flux.weekPicker"
        label="Label"
        :errorMessage="'This is a required field'"
        required
      />
    </div>
  </div>
</template>
