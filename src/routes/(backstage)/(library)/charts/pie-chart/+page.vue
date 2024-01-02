<script lang="ts" setup>
import type { Options } from 'highcharts';
import { reactive } from 'vue';
import highcharts from 'highcharts';
import { XBreadcrumb, XCard } from '@x/ui';

import Chart from '~/components/Chart.vue';

import PieChart from './PieChart.vue';

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
          { name: 'Chrome', y: 70.67, color: '#ef4444' },
          { name: 'Edge', y: 14.77, color: '#f97316' },
          { name: 'Firefox', y: 4.86, color: '#eab308' },
          { name: 'Safari', y: 2.63, color: '#22c55e' },
          { name: 'Internet Explorer', y: 1.53, color: '#3b82f6' },
          { name: 'Opera', y: 1.4, color: '#6366f1' },
          { name: 'Other', y: 2.6, color: '#a855f7' },
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
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Pie' }]" />

  <h1 class="text-4xl font-extrabold my-4">PieChart</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Chart :options="flux.basicBarChart" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Patterns</h2>

    <XCard>
      <Chart :options="flux.patternFillPieChart" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>

    <XCard>
      <PieChart />
    </XCard>
  </section>
</template>
