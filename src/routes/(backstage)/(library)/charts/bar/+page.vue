<script lang="ts" setup>
import type { Options } from 'highcharts';
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Chart from '~/components/Chart.vue';

import BarChart from './BarChart.vue';

const flux = reactive({
  barChartOptions: {
    chart: {
      type: 'bar',
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: ' millions',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Year 1990',
        data: [631, 727, 3202, 721, 26],
        color: '#14b8a6',
      },
      {
        name: 'Year 2000',
        data: [814, 841, 3714, 726, 31],
        color: '#8b5cf6',
      },
      {
        name: 'Year 2010',
        data: [1044, 944, 4170, 735, 40],
        color: '#ec4899',
      },
      {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746, 42],
        color: '#10b981',
      },
    ],
  } as Options,
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Bar' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Bar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Chart :options="flux.barChartOptions" />
  </div>

  <BarChart />
</template>
