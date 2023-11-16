<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const worldMap = ref();
const loading = ref(true);

const color = [
  '#313695', //    0
  '#4575b4', //  100
  '#74add1', //  200
  '#abd9e9', //  300
  '#e0f3f8', //  400
  '#ffffbf', //  500
  '#fee090', //  600
  '#fdae61', //  700
  '#f46d43', //  800
  '#d73027', //  900
  '#a50026', // 1000
];

const dataset = [
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
];

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

  const zoom: any = d3.zoom().on('zoom', zoomed);

  function zoomed(event: any) {
    svg.selectAll('g').attr('transform', event.transform);
  }

  // append the svg object to the body of the page
  const svg = d3
    .select(worldMap.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 688 344')
    .attr('preserveAspectRatio', 'xMinYMin')
    .style('position', 'relative')
    .call(zoom); // Enable zoom on the main SVG

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
    .attr('fill', function (d: any) {
      const current = dataset.find((item) => item.name === d.properties.name);

      if (current?.value) {
        // Define your color scale and domain
        const colorScale = d3
          .scaleThreshold<number, string>()
          .domain([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
          .range(color);

        // Get the color based on the value
        return colorScale(current.value) || '#a1a1aa';
      }

      return '#a1a1aa';
    })
    .attr('d', d3.geoPath().projection(gfg) as any)
    .style('stroke', '#fafafa')
    .on('mouseover', function () {
      tooltip.style('opacity', 0.8).style('display', 'block');
      d3.select(this).style('opacity', 0.5);
    })
    .on('mousemove', function (event, d: any) {
      const current = dataset.find((item) => item.name === d.properties.name);

      tooltip
        .html(`${d.properties.name}<br>Population: ${current?.value || 'N/A'}`)
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on('mouseleave', function () {
      tooltip.style('opacity', 0);
      d3.select(this).style('opacity', 1);
    });

  // Create an SVG for the legend
  const legend = svg.append('g').attr('transform', 'translate(10,' + (height - 30) + ')');

  // Define the legend scale
  const legendScale = d3
    .scaleOrdinal<number, string>()
    .domain([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
    .range(color);

  // Create legend rectangles
  legend
    .selectAll('rect')
    .data(legendScale.domain())
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      return i * 25; // Adjust the spacing as needed
    })
    .attr('width', 25)
    .attr('height', 15)
    .attr('fill', function (d) {
      return legendScale(d) || '#a1a1aa';
    });

  // Create legend labels
  legend
    .selectAll('text')
    .data(legendScale.domain())
    .enter()
    .append('text')
    .attr('x', function (d, i) {
      return i * 25 + 10; // Adjust the spacing and positioning as needed
    })
    .attr('y', 30) // Adjust the vertical position as needed
    .text(function (d) {
      return d;
    })
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('fill', '#fff'); // Adjust the text color as needed
});

function getRandomInt() {
  return Math.floor(Math.random() * 1_000) + 1;
}
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
