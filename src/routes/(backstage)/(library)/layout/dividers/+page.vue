<script lang="ts" setup>
import { XBreadcrumb, XCard, XDivider } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Divider' }]" />

  <h1 class="text-4xl font-extrabold my-4">Divider</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Horizontal</h2>

    <XCard>
      <div>Text</div>
      <XDivider />
      <div>Text</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Vertical</h2>

    <XCard>
      <div class="flex">
        <div>Text</div>
        <XDivider orientation="vertical" />
        <div>Text</div>
      </div>
    </XCard>
  </section>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">
      Horizontal
      <code class="text-sm text-gray-700 bg-gray-300 p-1 rounded">divide-x-2</code>
    </div>

    <div class="flex shadow rounded bg-white dark:bg-slate-700 divide-x-2">
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

    <div class="flex flex-col shadow rounded bg-white dark:bg-slate-700 divide-y-2">
      <div v-for="num in 5" :key="num" class="px-4 py-2">
        {{ num }}
      </div>
    </div>
  </div>
</template>
