<script lang="ts" setup>
import { XChart } from '@x/ui';
import type { EChartsOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { DataZoomComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { computed } from 'vue';

use([BarChart, DataZoomComponent]);

const chart = computed<EChartsOption>(() => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let dataZoom: any;

  if (months.length > 10) {
    const num = 10;

    let end = ((num - 1) / months.length) * 100;

    if (months.length <= num * 2) {
      end = (num / months.length) * 100;
    }

    dataZoom = [
      {
        show: true,
        start: 0,
        end,
        zoomLock: true,
        brushSelect: false,
      },
      {
        type: 'inside',
        start: 0,
        end,
        zoomLock: true,
        brushSelect: false,
      },
    ];
  }

  return {
    legend: {
      data: ['2021', '2022'],
      top: 'top',
    },
    grid: {
      top: '10%',
      right: '3%',
      left: '3%',
      bottom: '12.5%',
      outerBoundsMode: 'same',
    },
    xAxis: [
      {
        type: 'category',
        data: months,
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: { interval: 0, rotate: 45 },
      },
    ],
    yAxis: {
      type: 'value',
    },
    dataZoom,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        data: [27, 68, 86, 74, 10, 4, 87, 36, 42, 77, 99, 18],
        label: {
          show: true,
          position: 'top',
        },
      },
      {
        type: 'bar',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        data: [30, 78, 56, 34, 100, 45, 13, 55, 61, 45, 88, 64],
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  };
});
</script>

<template>
  <XChart :option="chart" class="w-full h-100" />
</template>
