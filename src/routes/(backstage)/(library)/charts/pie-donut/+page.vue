<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, computed } from 'vue';
import { XBreadcrumb, XCard } from '@x/ui';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';

import Echarts from '~/components/Echarts.vue';

use([PieChart]);

const dataBrowser = ref([
  { value: 77.4, name: 'Chrome' },
  { value: 10.6, name: 'Edge' },
  { value: 4.9, name: 'Firefox' },
  { value: 3.9, name: 'Safari' },
  { value: 2.4, name: 'Opera' },
]);

const pieChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        name: 'Browser',
        radius: '60%',
        top: '-5%',
        data: dataBrowser.value,
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Pie & Donut' }]" />

  <h1 class="text-4xl font-extrabold my-4">Pie & Donut</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Pie</h2>

    <XCard>
      <Echarts :option="pieChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Donut</h2>

    <XCard>
      <!-- <Echarts :option="donutChartOption" class="w-full h-100" /> -->
    </XCard>
  </section>
</template>
