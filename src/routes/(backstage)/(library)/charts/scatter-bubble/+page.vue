<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';
import { XBreadcrumb, XCard } from '@x/ui';
import { use, graphic } from 'echarts/core';
import { ScatterChart } from 'echarts/charts';

import Echarts from '~/components/Echarts.vue';

use([ScatterChart]);

const scatterChartOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '10%',
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

const bubbleChartOption = computed<EChartsOption>(() => {
  const data = [
    [
      [28604, 77, 17096869, 'Australia', 1990],
      [31163, 77.4, 27662440, 'Canada', 1990],
      [1516, 68, 1154605773, 'China', 1990],
      [13670, 74.7, 10582082, 'Cuba', 1990],
      [28599, 75, 4986705, 'Finland', 1990],
      [29476, 77.1, 56943299, 'France', 1990],
      [31476, 75.4, 78958237, 'Germany', 1990],
      [28666, 78.1, 254830, 'Iceland', 1990],
      [1777, 57.7, 870601776, 'India', 1990],
      [29550, 79.1, 122249285, 'Japan', 1990],
      [2076, 67.9, 20194354, 'North Korea', 1990],
      [12087, 72, 42972254, 'South Korea', 1990],
      [24021, 75.4, 3397534, 'New Zealand', 1990],
      [43296, 76.8, 4240375, 'Norway', 1990],
      [10088, 70.8, 38195258, 'Poland', 1990],
      [19349, 69.6, 147568552, 'Russia', 1990],
      [10670, 67.3, 53994605, 'Turkey', 1990],
      [26424, 75.7, 57110117, 'United Kingdom', 1990],
      [37062, 75.4, 252847810, 'United States', 1990],
    ],
    [
      [44056, 81.8, 23968973, 'Australia', 2015],
      [43294, 81.7, 35939927, 'Canada', 2015],
      [13334, 76.9, 1376048943, 'China', 2015],
      [21291, 78.5, 11389562, 'Cuba', 2015],
      [38923, 80.8, 5503457, 'Finland', 2015],
      [37599, 81.9, 64395345, 'France', 2015],
      [44053, 81.1, 80688545, 'Germany', 2015],
      [42182, 82.8, 329425, 'Iceland', 2015],
      [5903, 66.8, 1311050527, 'India', 2015],
      [36162, 83.5, 126573481, 'Japan', 2015],
      [1390, 71.4, 25155317, 'North Korea', 2015],
      [34644, 80.7, 50293439, 'South Korea', 2015],
      [34186, 80.6, 4528526, 'New Zealand', 2015],
      [64304, 81.6, 5210967, 'Norway', 2015],
      [24787, 77.3, 38611794, 'Poland', 2015],
      [23038, 73.13, 143456918, 'Russia', 2015],
      [19360, 76.5, 78665830, 'Turkey', 2015],
      [38225, 81.4, 64715810, 'United Kingdom', 2015],
      [53354, 79.1, 321773631, 'United States', 2015],
    ],
  ];

  return {
    legend: {
      bottom: '2.5%',
      data: ['1990', '2015'],
    },
    grid: {
      top: '10%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      scale: true,
    },
    series: [
      {
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize(data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter(param: any) {
              return param.data[3];
            },
            position: 'top',
          },
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: new graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(251, 118, 123)',
            },
            {
              offset: 1,
              color: 'rgb(204, 46, 72)',
            },
          ]),
        },
      },
      {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize(data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter(param: any) {
              return param.data[3];
            },
            position: 'top',
          },
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          color: new graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(129, 227, 238)',
            },
            {
              offset: 1,
              color: 'rgb(25, 183, 207)',
            },
          ]),
        },
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Scatter & Bubble' }]" />

  <h1 class="text-4xl font-extrabold my-4">Scatter & Bubble</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Scatter</h2>

    <XCard>
      <Echarts :option="scatterChartOption" class="w-full h-100" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Bubble</h2>

    <XCard>
      <Echarts :option="bubbleChartOption" class="w-full h-100" />
    </XCard>
  </section>
</template>
