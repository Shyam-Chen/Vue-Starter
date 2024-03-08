<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Grid' }]" />

  <h1 class="text-4xl font-extrabold my-4">Grid</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Columns</h2>

    <XCard>
      <div class="grid grid-cols-12 gap-2 text-white">
        <div class="col-span-8 bg-primary-400 rounded p-2 text-center">col-8</div>
        <div class="col-span-4 bg-primary-400 rounded p-2 text-center">col-4</div>

        <div class="col-span-4 bg-primary-400 rounded p-2 text-center">col-4</div>
        <div class="col-span-8 bg-primary-400 rounded p-2 text-center">col-8</div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Rows</h2>

    <XCard>
      <div class="grid grid-cols-12 grid-rows-3 gap-2 text-white">
        <div class="col-span-4 row-span-3 bg-primary-400 rounded p-2 text-center">col-4 row-3</div>
        <div class="col-span-8 bg-primary-400 rounded p-2 text-center">col-8 row-1</div>
        <div class="col-span-8 row-span-2 bg-primary-400 rounded p-2 text-center">col-8 row-2</div>
      </div>
    </XCard>
  </section>
</template>
