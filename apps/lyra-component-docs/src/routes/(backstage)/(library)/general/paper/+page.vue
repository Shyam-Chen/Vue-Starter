<script lang="ts" setup>
import { XBreadcrumb } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Paper' }]" />

  <h1 class="text-4xl font-extrabold my-4">Paper</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Elevation</h2>

    <div class="grid grid-cols-3 gap-6 text-center">
      <div class="shadow p-4 bg-white dark:bg-slate-800">shadow</div>
      <div class="shadow-md p-4 bg-white dark:bg-slate-700 dark:text-slate-300">shadow-md</div>
      <div class="shadow-lg p-4 bg-white dark:bg-slate-600 dark:text-slate-200">shadow-lg</div>
    </div>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Rounded</h2>

    <div class="grid grid-cols-3 gap-6 text-center">
      <div class="rounded p-4 border-2 border-primary-500">rounded</div>
      <div class="rounded-md p-4 border-2 border-primary-500">rounded-md</div>
      <div class="rounded-lg p-4 border-2 border-primary-500">rounded-lg</div>
    </div>
  </section>
</template>
