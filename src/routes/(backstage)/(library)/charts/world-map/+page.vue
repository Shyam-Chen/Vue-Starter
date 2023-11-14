<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, onMounted } from 'vue';
import { XBreadcrumb } from '@x/ui';
import { use, registerMap } from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { VisualMapComponent, TooltipComponent, ToolboxComponent } from 'echarts/components';
import Chart from 'vue-echarts';

import WorldMap from './WorldMap.vue';

use([MapChart, SVGRenderer, VisualMapComponent, TooltipComponent, ToolboxComponent]);

const loading = ref(true);
const worldMapOption = ref<EChartsOption>();

const max = 1_000;

function getRandomInt() {
  return Math.floor(Math.random() * max) + 1;
}

onMounted(async () => {
  loading.value = true;

  const geojson = await fetch(
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
  ).then((res) => res.json());

  loading.value = false;

  geojson.features = geojson.features.filter((item: any) => item.properties.name !== 'Antarctica');

  registerMap('topo', geojson);

  worldMapOption.value = {
    visualMap: {
      left: 'right',
      min: 0,
      max,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
      text: ['High', 'Low'],
      calculable: true,
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
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
        name: 'CDN Data Transfer',
        type: 'map',
        roam: true,
        map: 'topo',
        emphasis: {
          label: {
            show: true,
          },
        },
        data: [
          { name: 'Australia', value: getRandomInt() },
          { name: 'Canada', value: getRandomInt() },
          { name: 'China', value: getRandomInt() },
          { name: 'England', value: getRandomInt() },
          { name: 'France', value: getRandomInt() },
          { name: 'Germany', value: getRandomInt() },
          { name: 'India', value: getRandomInt() },
          { name: 'Japan', value: getRandomInt() },
          { name: 'Russia', value: getRandomInt() },
          { name: 'South Korea', value: getRandomInt() },
          { name: 'Taiwan', value: getRandomInt() },
          { name: 'USA', value: getRandomInt() },
        ],
      },
    ],
  };
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'World Map' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">World Map</div>
  </div>

  <div v-if="loading">Loading...</div>
  <Chart v-else :option="worldMapOption" autoresize class="w-full h-125" />

  <WorldMap />
</template>
