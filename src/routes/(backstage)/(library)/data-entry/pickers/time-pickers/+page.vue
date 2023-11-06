<script lang="ts" setup>
import { reactive } from 'vue';

import { XBreadcrumb, XTimePicker } from '@x/ui';

const flux = reactive({
  timePicker: '',
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'Time pickers' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Time pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTimePicker v-model:value="flux.timePicker" />
    </div>

    <div class="mt-2">{{ flux.timePicker }}</div>
  </div>
</template>
