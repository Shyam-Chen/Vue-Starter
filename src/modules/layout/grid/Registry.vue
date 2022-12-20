<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const flux = reactive({
  launch() {
    flux.dialog = true;
  },
  dialog: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Layout', disabled: true },
      { text: 'Grid', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Grid</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Columns</div>

    <div class="grid grid-cols-12 gap-2 text-white">
      <div class="col-span-8 bg-blue-400 rounded p-2 text-center">col-8</div>
      <div class="col-span-4 bg-blue-400 rounded p-2 text-center">col-4</div>

      <div class="col-span-4 bg-blue-400 rounded p-2 text-center">col-4</div>
      <div class="col-span-8 bg-blue-400 rounded p-2 text-center">col-8</div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rows</div>

    <div class="grid grid-cols-12 grid-rows-3 gap-2 text-white">
      <div class="col-span-4 row-span-3 bg-blue-400 rounded p-2 text-center">col-4 row-3</div>
      <div class="col-span-8 bg-blue-400 rounded p-2 text-center">col-8 row-1</div>
      <div class="col-span-8 row-span-2 bg-blue-400 rounded p-2 text-center">col-8 row-2</div>
    </div>
  </div>
</template>
