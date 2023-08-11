<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Paper' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Paper</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Elevation</div>

    <div class="grid grid-cols-3 gap-6 text-center">
      <div class="p-4">0</div>
      <div class="shadow p-4 bg-white dark:bg-slate-800">1</div>
      <div class="shadow-md p-4 bg-white dark:bg-slate-700 dark:text-slate-300">2</div>
      <div class="shadow-lg p-4 bg-white dark:bg-slate-600 dark:text-slate-200">3</div>
      <div class="shadow-xl p-4 bg-white dark:bg-slate-500 dark:text-slate-100">4</div>
      <div class="shadow-2xl p-4 bg-white dark:bg-slate-400 dark:text-slate-900">5</div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rounded</div>

    <div class="grid grid-cols-3 gap-6 text-center">
      <div class="p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">0</div>
      <div class="rounded p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">1</div>
      <div class="rounded-md p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">2</div>
      <div class="rounded-lg p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">3</div>
      <div class="rounded-xl p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">4</div>
      <div class="rounded-2xl p-4 bg-white dark:bg-slate-800 border-2 border-primary-500">5</div>
    </div>
  </div>
</template>
