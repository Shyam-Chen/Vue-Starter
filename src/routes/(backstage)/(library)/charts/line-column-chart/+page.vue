<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import LineColumnChart from './LineColumnChart.vue';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'LineColumnChart' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">LineColumnChart</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4">Basic</div>

    <LineColumnChart />
  </div>
</template>
