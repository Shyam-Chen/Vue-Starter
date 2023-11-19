<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import MapChart from './MapChart.vue';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'MapChart' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">MapChart</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4">Basic</div>

    <MapChart />
  </div>
</template>
