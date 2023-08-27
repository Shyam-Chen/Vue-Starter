<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import MonthPicker from '~/components/MonthPicker.vue';

const flux = reactive({
  monthPicker: '',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'Month pickers' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Month pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <MonthPicker v-model:value="flux.monthPicker" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <MonthPicker v-model:value="flux.monthPicker" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Status</div>

    <div class="flex justify-center">
      <MonthPicker v-model:value="flux.monthPicker" :errorMessage="'Error'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Status</div>

    <div class="flex justify-center">
      <MonthPicker v-model:value="flux.monthPicker" :errorMessage="'Error'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Status</div>

    <div class="flex justify-center">
      <MonthPicker v-model:value="flux.monthPicker" :errorMessage="'Error'" />
    </div>
  </div>
</template>
