<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';
import { XBreadcrumb, XCard, XChart } from '@lyra/ui';
import { use, registerMap } from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { VisualMapComponent, ToolboxComponent } from 'echarts/components';

// https://public.opendatasoft.com/explore/dataset/natural-earth-countries-1_110m/export/
// Geographic file formats -> GeoJSON
import geojson from './countries-110m.json';

use([MapChart, VisualMapComponent, ToolboxComponent]);

const countries110m = geojson.features.filter((item) => item.properties.name !== 'Antarctica');
geojson.features = countries110m;

registerMap('world', JSON.stringify(geojson));

const dataset = [
  { name: 'Canada', value: 35_362_905 },
  { name: 'United States of America', value: 323_995_528 },

  { name: 'Argentina', value: 43_886_748 },

  { name: 'France', value: 66_836_154 },
  { name: 'Germany', value: 80_722_792 },
  { name: 'United Kingdom', value: 64_430_428 },

  { name: 'China', value: 1_373_541_278 },
  { name: 'Russia', value: 142_355_415 },
  { name: 'India', value: 1_266_883_598 },
  { name: 'Japan', value: 126_702_133 },
  { name: 'South Korea', value: 50_924_172 },
  { name: 'Taiwan', value: 23_464_787 },

  { name: 'Australia', value: 22_992_654 },
];

const mapChartOption = computed<EChartsOption>(() => {
  const values = dataset.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  return {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
    },
    visualMap: {
      left: 'left',
      max: maxValue,
      min: minValue,
      inRange: {
        color: ['#86CEF8', '#FDFE34', '#FF4C1F'],
      },
      text: ['High', 'Low'],
      calculable: true,
    },
    toolbox: {
      show: true,
      right: 'right',
      top: 'top',
      feature: {
        restore: {},
      },
    },
    series: [
      {
        name: 'Population',
        type: 'map',
        roam: true,
        map: 'world',
        emphasis: {
          label: {
            show: true,
          },
        },
        data: dataset,
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'Map' }]" />

  <h1 class="text-4xl font-extrabold my-4">Map</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Countries-110m</h2>

    <XCard>
      <XChart :option="mapChartOption" class="w-full min-h-100 h-75dvh" />
    </XCard>
  </section>
</template>
