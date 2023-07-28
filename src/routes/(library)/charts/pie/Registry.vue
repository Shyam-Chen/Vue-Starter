<script lang="ts" setup>
import type { Options } from 'highcharts';
import { reactive } from 'vue';
import highcharts from 'highcharts';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Chart from '~/components/Chart.vue';

const flux = reactive({
  basicBarChart: {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
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
          { name: 'Chrome', y: 70.67, sliced: true, selected: true },
          { name: 'Edge', y: 14.77 },
          { name: 'Firefox', y: 4.86 },
          { name: 'Safari', y: 2.63 },
          { name: 'Internet Explorer', y: 1.53 },
          { name: 'Opera', y: 1.4 },
          { name: 'Sogou Explorer', y: 0.84 },
          { name: 'QQ', y: 0.51 },
          { name: 'Other', y: 2.6 },
        ],
      },
    ],
  } as Options,
  patternFillPieChart: {
    title: {
      text: 'Pattern fill plugin demo',
    },
    legend: {
      enabled: true,
    },
    series: [
      {
        showInLegend: true,
        type: 'pie',
        borderColor: highcharts?.getOptions?.()?.colors?.[0],
        data: [
          { y: 1, color: { patternIndex: 0 } },
          { y: 1, color: { patternIndex: 1 } },
          { y: 1, color: { patternIndex: 2 } },
          { y: 1, color: { patternIndex: 3 } },
          { y: 1, color: { patternIndex: 4 } },
          { y: 1, color: { patternIndex: 5 } },
          { y: 1, color: { patternIndex: 6 } },
          { y: 1, color: { patternIndex: 7 } },
          { y: 1, color: { patternIndex: 8 } },
          { y: 1, color: { patternIndex: 9 } },
          {
            y: 1,
            color: {
              pattern: {
                image:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/United_States_one_dollar_bill%2C_obverse.jpg/320px-United_States_one_dollar_bill%2C_obverse.jpg',
                aspectRatio: 9 / 4,
              },
            },
          },
        ],
        dataLabels: {
          connectorColor: highcharts?.getOptions?.()?.colors?.[0],
          formatter() {
            const i = this.point.index;

            return i > 9
              ? 'Custom pattern' // For the last one, show custom label
              : 'default-pattern-' + i; // Show default pattern label
          },
        },
      },
    ],
  } as Options,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Charts', disabled: true },
      { text: 'Pie', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Pie</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Chart :options="flux.basicBarChart" />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Pattern Fill</div>

    <Chart :options="flux.patternFillPieChart" />
  </div>
</template>
