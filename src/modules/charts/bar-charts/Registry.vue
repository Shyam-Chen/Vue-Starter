<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import highcharts from 'highcharts';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const basicBar = ref();

const flux = reactive({
  basicBarChart: {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Monthly Average Rainfall',
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
    },
    xAxis: {
      // prettier-ignore
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)',
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#14b8a6',
      },
      {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
        color: '#8b5cf6',
      },
      {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
        color: '#ec4899',
      },
      {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],
        color: '#10b981',
      },
    ],
  },
});

onMounted(() => {
  // @ts-ignore
  highcharts.chart(basicBar.value, flux.basicBarChart);
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Charts', disabled: true },
      { text: 'Bar Charts', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Bar Charts</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div ref="basicBar"></div>
  </div>
</template>
