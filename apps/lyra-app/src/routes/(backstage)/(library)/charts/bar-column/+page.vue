<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, computed } from 'vue';
import { XBreadcrumb, XCard, XChart } from '@lyra/ui';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';

use([BarChart]);

const data2021 = ref([27, 68, 86, 74, 10, 4, 87]);
const data2022 = ref([30, 78, 56, 34, 100, 45, 13]);

const barChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '5%',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        type: 'bar',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        data: data2021.value,
      },
      {
        type: 'bar',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        data: data2022.value,
      },
    ],
  };
});

const columnChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        type: 'bar',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        data: data2021.value,
      },
      {
        type: 'bar',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        data: data2022.value,
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Bar & Column' }]" />

  <h1 class="text-4xl font-extrabold my-4">Bar & Column</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Bar</h2>

    <XCard>
      <XChart :option="barChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Column</h2>

    <XCard>
      <XChart :option="columnChartOption" class="w-full h-100" />
    </XCard>
  </section>
</template>
