<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';

import DonutChart from './DonutChart.vue';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Donut' }]" />

  <h1 class="text-4xl font-extrabold my-4">DonutChart</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <DonutChart />
    </XCard>
  </section>
</template>
