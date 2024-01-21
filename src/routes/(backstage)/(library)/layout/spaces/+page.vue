<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Spaces' }]" />

  <h1 class="text-4xl font-extrabold my-4">Spaces</h1>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      Horizontal
      <code class="text-sm text-gray-700 bg-gray-300 p-1 rounded">space-x-4</code>
    </div>

    <div class="flex space-x-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 rounded shadow bg-white dark:bg-slate-700">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      Vertical
      <code class="text-sm text-gray-700 bg-gray-300 p-1 rounded">space-y-4</code>
    </div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 rounded shadow bg-white dark:bg-slate-700">
        {{ num }}
      </div>
    </div>
  </div>
</template>
