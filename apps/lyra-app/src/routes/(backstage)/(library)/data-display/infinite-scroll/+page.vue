<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@lyra/ui';

import InfiniteList from './InfiniteList.vue';
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Infinite Scroll' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">Infinite Scroll</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <InfiniteList />
    </XCard>
  </section>
</template>
