<script lang="ts" setup>
import { reactive } from 'vue';
import { useDark } from '@vueuse/core';
import highcharts from 'highcharts';
import { Chart } from 'highcharts-vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';

const isDark = useDark();

const flux = reactive({
  basicLineChart: {
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
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
  },
  update() {
    const randomInt = (max = 99) => Math.floor(Math.random() * max) + 1;

    const idx_2021 = flux.basicLineChart.series.findIndex((serie) => serie.name === '2021');
    flux.basicLineChart.series[idx_2021].data = Array.from({ length: 7 }, () => randomInt());

    const idx_2022 = flux.basicLineChart.series.findIndex((serie) => serie.name === '2022');
    flux.basicLineChart.series[idx_2022].data = Array.from({ length: 7 }, () => randomInt());
  },
});

if (isDark.value) {
  highcharts.setOptions({
    chart: {
      backgroundColor: 'rgb(30 41 59)',
    },
    xAxis: {
      labels: {
        style: {
          color: '#cbd5e1',
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: '#cbd5e1',
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#94a3b8',
      },
      itemHoverStyle: {
        color: '#e2e8f0',
      },
    },
  });
}
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Charts', disabled: true },
      { text: 'Line Charts', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Line Charts</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Chart :options="flux.basicLineChart" :highcharts="highcharts" />

    <Button class="mt-2" @click="flux.update">Update</Button>
  </div>
</template>
