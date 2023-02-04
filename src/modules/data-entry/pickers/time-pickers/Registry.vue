<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TimePicker from '~/components/TimePicker.vue';

const flux = reactive({
  timePicker: '',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Pickers', disabled: true },
      { text: 'Time pickers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Time pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <TimePicker v-model:value="flux.timePicker" />
    </div>

    <div>
      <pre>{{ flux.timePicker }}</pre>
    </div>
  </div>
</template>
