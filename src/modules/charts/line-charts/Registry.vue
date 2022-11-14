<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import highcharts from 'highcharts';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const basicLine = ref();

const flux = reactive({
  basicLineChart: {
    title: {
      text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
    },

    subtitle: {
      text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
    },

    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: 'Installation & Developers',
        data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610],
      },
      {
        name: 'Manufacturing',
        data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050],
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663],
      },
      {
        name: 'Operations & Maintenance',
        data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077],
      },
      {
        name: 'Other',
        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  },
});

const update = () => {
  const idx = flux.basicLineChart.series.findIndex((serie) => serie.name === 'Other');
  flux.basicLineChart.series[idx].data = [
    53934, 58656, 25165, 71827, 22143, 12383, 171533, 265174, 155157, 61454, 154610,
  ];

  // @ts-ignore
  highcharts.chart(basicLine.value, flux.basicLineChart);
};

onMounted(() => {
  // @ts-ignore
  highcharts.chart(basicLine.value, flux.basicLineChart);
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Charts', disabled: true },
      { text: 'Line Charts', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Line Charts</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div ref="basicLine"></div>

    <button @click="update">Update</button>
  </div>
</template>
