<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Chart from '~/components/Chart.vue';

const flux = reactive({
  basicBarChart: {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: 'Edge',
            y: 14.77,
          },
          {
            name: 'Firefox',
            y: 4.86,
          },
          {
            name: 'Safari',
            y: 2.63,
          },
          {
            name: 'Internet Explorer',
            y: 1.53,
          },
          {
            name: 'Opera',
            y: 1.4,
          },
          {
            name: 'Sogou Explorer',
            y: 0.84,
          },
          {
            name: 'QQ',
            y: 0.51,
          },
          {
            name: 'Other',
            y: 2.6,
          },
        ],
      },
    ],
  },
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Chart Types', disabled: true },
      { text: 'Pie Charts', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Pie Charts</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Chart :options="flux.basicBarChart" />
  </div>
</template>
