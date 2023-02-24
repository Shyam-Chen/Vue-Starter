<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import highcharts from 'highcharts';
// import patternFill from 'highcharts/modules/pattern-fill';
import { Chart as HighChart } from 'highcharts-vue';

// patternFill(highcharts);

const isDark = useDark();

highcharts.setOptions({
  accessibility: {
    enabled: false,
  },
  credits: {
    enabled: false,
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
      title: {
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
  <HighChart v-bind="$attrs" :highcharts="highcharts" />
</template>
