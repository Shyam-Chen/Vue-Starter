<script lang="ts" setup>
import { XBreadcrumb, XCard, XChart } from '@x/ui';
import type { EChartsOption } from 'echarts';
import { PieChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { computed } from 'vue';

use([PieChart]);

const pieChartOption = computed<EChartsOption>(() => {
  const dataBrowser = [
    { value: 77.4, name: 'Chrome' },
    { value: 10.6, name: 'Edge' },
    { value: 4.9, name: 'Firefox' },
    { value: 3.9, name: 'Safari' },
    { value: 2.4, name: 'Opera' },
  ];

  return {
    legend: {
      bottom: '2.5%',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        name: 'Browser',
        radius: '60%',
        top: '-5%',
        data: dataBrowser,
      },
    ],
  };
});

const donutChartOption = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      bottom: '2.5%',
      data: [
        'Direct',
        'Marketing',
        'Search Engine',
        'Email',
        'Union Ads',
        'Video Ads',
        'Baidu',
        'Google',
        'Bing',
        'Others',
      ],
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: [0, '35%'],
        label: {
          position: 'inner',
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1548, name: 'Search Engine' },
          { value: 775, name: 'Direct' },
          { value: 679, name: 'Marketing', selected: true },
        ],
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '60%'],
        labelLine: {
          length: 30,
        },
        data: [
          { value: 1048, name: 'Baidu' },
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 251, name: 'Google' },
          { value: 234, name: 'Union Ads' },
          { value: 147, name: 'Bing' },
          { value: 135, name: 'Video Ads' },
          { value: 102, name: 'Others' },
        ],
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Pie & Donut' }]" />

  <h1 class="text-4xl font-extrabold my-4">Pie & Donut</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Pie</h2>

    <XCard>
      <XChart :option="pieChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Donut</h2>

    <XCard>
      <XChart :option="donutChartOption" class="w-full h-100" />
    </XCard>
  </section>
</template>
