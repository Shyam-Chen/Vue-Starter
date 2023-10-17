<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { ref, onMounted } from 'vue';
import { use, registerMap } from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { VisualMapComponent, TooltipComponent, ToolboxComponent } from 'echarts/components';
import Chart from 'vue-echarts';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

use([MapChart, SVGRenderer, VisualMapComponent, TooltipComponent, ToolboxComponent]);

const loading = ref(true);
const worldMapOption = ref<EChartsOption>();

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
      max: 1000,
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
          { name: 'USA', value: 900 },
          { name: 'England', value: 111 },
          { name: 'Canada', value: 123 },
          { name: 'China', value: 333 },
          { name: 'Japan', value: 821 },
          { name: 'South Korea', value: 500 },
          // { name: 'Taiwan', value: 400 },
          { name: 'Germany', value: 720 },
          { name: 'Russia', value: 222 },
        ],
      },
    ],
  };
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Charts' }, { text: 'World Map' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">World Map</div>
  </div>

  <div v-if="loading">Loading...</div>
  <Chart v-else :option="worldMapOption" autoresize class="w-full h-125" />
</template>
