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
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Pickers', disabled: true },
      { text: 'Week Pickers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Week Pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <WeekPicker v-model:value="flux.weekPicker" />
    </div>
  </div>
</template>
