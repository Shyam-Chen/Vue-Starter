<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import DonutChart from './DonutChart.vue';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'DonutChart' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">DonutChart</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4">Basic</div>

    <DonutChart />
  </div>
</template>
