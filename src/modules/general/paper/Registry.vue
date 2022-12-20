<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'General', disabled: true },
      { text: 'Paper', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Paper</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Elevation</div>

    <div class="grid grid-cols-3 gap-6">
      <div class="p-4 bg-blue-400 text-white">elevation-1</div>
      <div class="shadow p-4 bg-blue-400 text-white">elevation-2</div>
      <div class="shadow-md p-4 bg-blue-400 text-white">elevation-3</div>
      <div class="shadow-lg p-4 bg-blue-400 text-white">elevation-4</div>
      <div class="shadow-xl p-4 bg-blue-400 text-white">elevation-5</div>
      <div class="shadow-2xl p-4 bg-blue-400 text-white">elevation-6</div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rounded</div>

    <div class="grid grid-cols-3 gap-6">
      <div class="p-4 bg-blue-400 text-white">rounded-1</div>
      <div class="rounded p-4 bg-blue-400 text-white">rounded-2</div>
      <div class="rounded-md p-4 bg-blue-400 text-white">rounded-3</div>
      <div class="rounded-lg p-4 bg-blue-400 text-white">rounded-4</div>
      <div class="rounded-xl p-4 bg-blue-400 text-white">rounded-5</div>
      <div class="rounded-2xl p-4 bg-blue-400 text-white">rounded-6</div>
    </div>
  </div>
</template>
