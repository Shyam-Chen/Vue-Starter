<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, computed } from 'vue';
import { XBreadcrumb, XCard, XButton } from '@x/ui';
import { use } from 'echarts/core';
import { LineChart, BarChart, ScatterChart } from 'echarts/charts';

import Echarts from '~/components/Echarts.vue';

use([LineChart, BarChart, ScatterChart]);

const data2021 = ref([40, 68, 86, 74, 56, 60, 87]);
const data2022 = ref([65, 78, 66, 44, 56, 67, 75]);

const lineColumnChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '5%',
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
    },
    series: [
      {
        type: 'line',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        smooth: true,
        data: data2021.value,
      },
      {
        type: 'line',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        smooth: true,
        data: data2022.value,
      },
    ],
  };
});

const lineScatterChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '5%',
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
    },
    series: [
      {
        type: 'line',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        smooth: true,
        data: data2021.value,
      },
      {
        type: 'line',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        smooth: true,
        data: data2022.value,
      },
    ],
  };
});

function onUpdate() {
  const randomInt = (max = 99) => Math.floor(Math.random() * max) + 1;
  data2021.value = Array.from({ length: 7 }, () => randomInt());
  data2022.value = Array.from({ length: 7 }, () => randomInt());
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Mixed' }]" />

  <h1 class="text-4xl font-extrabold my-4">Mixed</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Line Column</h2>

    <XCard>
      <div class="flex justify-end mb-4 lg:mb-6">
        <XButton @click="onUpdate">Update</XButton>
      </div>

      <Echarts :option="lineColumnChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Line Scatter</h2>

    <XCard>
      <div class="flex justify-end mb-4 lg:mb-6">
        <XButton @click="onUpdate">Update</XButton>
      </div>

      <Echarts :option="lineScatterChartOption" class="w-full h-100" />
    </XCard>
  </section>
</template>
