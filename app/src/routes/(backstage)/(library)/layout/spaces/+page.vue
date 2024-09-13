<script lang="ts" setup>
import { XBreadcrumb, XCard, XCode } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Spaces' }]" />

  <h1 class="text-4xl font-extrabold my-4">Spaces</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Horizontal <XCode>space-x-4</XCode></h2>

    <XCard>
      <div class="space-x-4">
        <div
          v-for="num in 5"
          :key="num"
          class="inline-block px-4 py-2 rounded shadow bg-white dark:bg-slate-700"
        >
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Vertical <XCode>space-y-4</XCode></h2>

    <XCard>
      <div class="space-y-4">
        <div
          v-for="num in 5"
          :key="num"
          class="px-4 py-2 rounded shadow bg-white dark:bg-slate-700"
        >
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>
</template>
