<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import YearPicker from '~/components/YearPicker.vue';

const flux = reactive({
  yearPicker: '',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Pickers', disabled: true },
      { text: 'Year Pickers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Year Pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <YearPicker v-model:value="flux.yearPicker" />
    </div>
  </div>
</template>
