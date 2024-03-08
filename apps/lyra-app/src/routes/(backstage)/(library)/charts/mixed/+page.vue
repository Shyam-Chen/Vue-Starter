<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, computed } from 'vue';
import { XBreadcrumb, XCard, XChart } from '@lyra/ui';
import { use } from 'echarts/core';
import { LineChart, BarChart, ScatterChart } from 'echarts/charts';

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
        itemStyle: { color: '#84cc16' },
        smooth: true,
        data: data2021.value,
      },
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
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    series: [
      {
        type: 'line',
        itemStyle: { color: '#84cc16' },
        smooth: true,
        data: [
          [16.4, 5.4],
          [26.4, 8.9],
        ],
      },
      {
        type: 'scatter',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        smooth: true,
        data: [
          [16.4, 5.4],
          [21.7, 2],
          [25.4, 3],
          [19, 2],
          [10.9, 1],
          [13.6, 3.2],
          [10.9, 7.4],
          [10.9, 0],
          [10.9, 8.2],
          [16.4, 0],
          [16.4, 1.8],
          [13.6, 0.3],
          [13.6, 0],
          [29.9, 0],
          [27.1, 2.3],
          [16.4, 0],
          [13.6, 3.7],
          [10.9, 5.2],
          [16.4, 6.5],
          [10.9, 0],
          [24.5, 7.1],
          [10.9, 0],
          [8.1, 4.7],
          [19, 0],
          [21.7, 1.8],
          [27.1, 0],
          [24.5, 0],
          [27.1, 0],
          [29.9, 1.5],
          [27.1, 0.8],
          [22.1, 2],
        ],
      },
      {
        type: 'scatter',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        smooth: true,
        data: [
          [36.4, 13.4],
          [1.7, 11],
          [5.4, 8],
          [9, 17],
          [1.9, 4],
          [3.6, 12.2],
          [1.9, 14.4],
          [1.9, 9],
          [1.9, 13.2],
          [1.4, 7],
          [6.4, 8.8],
          [3.6, 4.3],
          [1.6, 10],
          [9.9, 2],
          [7.1, 15],
          [1.4, 0],
          [3.6, 13.7],
          [1.9, 15.2],
          [6.4, 16.5],
          [0.9, 10],
          [4.5, 17.1],
          [10.9, 10],
          [0.1, 14.7],
          [9, 10],
          [12.7, 11.8],
          [2.1, 10],
          [2.5, 10],
          [27.1, 10],
          [2.9, 11.5],
          [7.1, 10.8],
          [2.1, 12],
        ],
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Mixed' }]" />

  <h1 class="text-4xl font-extrabold my-4">Mixed</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Line Column</h2>

    <XCard>
      <XChart :option="lineColumnChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Line Scatter</h2>

    <XCard>
      <XChart :option="lineScatterChartOption" class="w-full h-100" />
    </XCard>
  </section>
</template>
