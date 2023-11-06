<script lang="ts" setup>
import type { Options } from 'highcharts';
import { reactive } from 'vue';
import { XBreadcrumb, XButton } from '@x/ui';

import Chart from '~/components/Chart.vue';

const flux = reactive({
  basicLineChart: {
    title: {
      text: '',
    },
    xAxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        type: 'spline',
        name: '2021',
        data: [40, 68, 86, 74, 56, 60, 87],
        color: '#6366f1',
      },
      {
        type: 'spline',
        name: '2022',
        data: [65, 78, 66, 44, 56, 67, 75],
        color: '#ec4899',
      },
    ],
  } as Options & { series: (Options['series'] & { data: number[] })[] },
  update() {
    const randomInt = (max = 99) => Math.floor(Math.random() * max) + 1;

    const idx_2021 = flux.basicLineChart.series.findIndex((serie) => serie.name === '2021');
    flux.basicLineChart.series[idx_2021].data = Array.from({ length: 7 }, () => randomInt());

    const idx_2022 = flux.basicLineChart.series.findIndex((serie) => serie.name === '2022');
    flux.basicLineChart.series[idx_2022].data = Array.from({ length: 7 }, () => randomInt());
  },
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Line' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Line</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Chart :options="flux.basicLineChart" />

    <XButton class="mt-2" @click="flux.update">Update</XButton>
  </div>
</template>
