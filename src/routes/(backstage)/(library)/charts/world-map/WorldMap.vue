<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const worldMap = ref();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  const geojson = await fetch(
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
  ).then((res) => res.json());

  loading.value = false;

  geojson.features = geojson.features.filter((item: any) => item.properties.name !== 'Antarctica');

  // set the dimensions and margins of the graph
  // const margin = { top: 100, right: 50, bottom: 120, left: 200 };
  const width = 688;
  const height = 344;

  // append the svg object to the body of the page
  const svg = d3
    .select(worldMap.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 688 344')
    .attr('preserveAspectRatio', 'xMinYMin')
    .style('position', 'relative');

  const gfg = d3
    .geoEquirectangular()
    .scale(100)
    .rotate([0, 0])
    .center([0, 0])
    .translate([width / 2, height / 1.75]);

  const tooltip = d3
    .select(worldMap.value)
    .append('div')
    .style('display', 'none')
    .attr('class', 'tooltip');

  svg
    .append('g')
    .selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('fill', '#71717a')
    .attr('d', d3.geoPath().projection(gfg) as any)
    .style('stroke', '#fafafa')
    .on('mouseover', function () {
      tooltip.style('opacity', 0.8).style('display', 'block');
      d3.select(this).style('opacity', 0.5);
    })
    .on('mousemove', function (event) {
      tooltip
        .html(`TODO`)
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on('mouseleave', function () {
      tooltip.style('opacity', 0);
      d3.select(this).style('opacity', 1);
    });
});
</script>

<template>
  <div ref="worldMap" class="WorldMap"></div>
</template>

<style lang="scss" scoped>
.WorldMap {
  :deep(.legend) {
    @apply fill-slate-500;
  }

  :deep(.tooltip) {
    @apply absolute text-sm text-slate-700 bg-white px-3 py-1 rounded shadow-lg;
  }
}

.dark .WorldMap {
  :deep(.legend) {
    @apply fill-slate-400;
  }
}
</style>
