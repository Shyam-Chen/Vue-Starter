<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Layout', disabled: true },
      { text: 'Dividers', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Dividers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      Horizontal
      <code class="text-sm text-gray-700 bg-gray-300 p-1 rounded">divide-x-2</code>
    </div>

    <div class="flex shadow rounded bg-white divide-x-2">
      <div v-for="num in 5" :key="num" class="flex-1 px-4 py-2">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      Vertical
      <code class="text-sm text-gray-700 bg-gray-300 p-1 rounded">divide-y-2</code>
    </div>

    <div class="flex flex-col shadow rounded bg-white divide-y-2">
      <div v-for="num in 5" :key="num" class="px-4 py-2">
        {{ num }}
      </div>
    </div>
  </div>
</template>
