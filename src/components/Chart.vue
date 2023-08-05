<script lang="ts" setup>
import type { Options } from 'highcharts';
import { ref, watch } from 'vue';
import { useDark } from '@vueuse/core';
import highcharts from 'highcharts';
import patternFill from 'highcharts/modules/pattern-fill';
import { Chart as HighChart } from 'highcharts-vue';
import merge from 'lodash/merge';

defineProps<{
  options?: Options;
}>();

patternFill(highcharts);

const isDark = useDark();

const theme = ref({});

const initialOptions = {
  accessibility: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
};

watch(
  () => isDark.value,
  () => {
    if (isDark.value) {
      theme.value = {
        ...initialOptions,
        chart: {
          backgroundColor: '#1e293b',
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
      };
    } else {
      theme.value = {
        ...initialOptions,
        chart: {
          backgroundColor: '#ffffff',
        },
        xAxis: {
          labels: {
            style: {
              color: '#666666',
            },
          },
        },
        yAxis: {
          labels: {
            style: {
              color: '#666666',
            },
          },
          title: {
            style: {
              color: '#666666',
            },
          },
        },
        legend: {
          itemStyle: {
            color: '#333333',
          },
          itemHoverStyle: {
            color: '#000000',
          },
        },
      };
    }
  },
  { immediate: true },
);
</script>

<template>
  <HighChart v-bind="$attrs" :highcharts="highcharts" :options="merge(options, theme)" />
</template>
