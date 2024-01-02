<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';

import MapChart from './MapChart.vue';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Map' }]" />

  <h1 class="text-4xl font-extrabold my-4">MapChart</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <MapChart />
    </XCard>
  </section>
</template>
